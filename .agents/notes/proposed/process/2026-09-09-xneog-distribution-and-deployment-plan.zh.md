# Agent Note: xneog 开源系统的完整分发计划

Status: proposed

[English](2026-09-09-xneog-distribution-and-deployment-plan.md) | 中文

## 问题

fork 现在承载带 xneog 改名后的上游 dsh 0.1.5-alpha.2，每套发布机制其实都已存在：三条 npm 序列、一条 Python wheel 流水线、一个文档站点、一个落地页，以及一套完整但纯手工的桌面打包流水线。缺的是一份计划，说明哪个产物进入哪个托管方、来自哪个 tag、用哪些凭据、以什么顺序，以及在首次公开发布之前还有哪些 fork 专属事项。缺口具体有五处。

**fork 的公开身份只接了一半。** npm scope 是 `@xneog`，仓库是 `gomes007-alt/xneog-harness`，默认分支是 `main`，文档站点预期位于 `https://xneog-harness.github.io/xneog-harness/`。文档 workflow 仍把投影源码链接固定为 `DOCS_REPOSITORY_REF: master`，而网站 base 路径默认是 `/`，除非设置 `DOCS_BASE`（[config.ts](../../../../website/.vitepress/config.ts)）。

**两个 workflow 曾部署同一个 GitHub Pages 站点。** [docs-pages.yml](../../../../.github/workflows/docs-pages.yml) 从 `dsh-v*` tag 部署文档站点，并发组为 `github-pages`；而一个独立的 fork workflow 在每次 `main` push 时部署 `landing/`，并发组不同。GitHub 每个仓库只提供一个 Pages 站点，因此后部署的那次会覆盖另一次；进展一节记录了单站点方案的落地。

**上游端点仍作为默认值随产品发布。** 当 `DSH_TELEMETRY_OTLP_URL` 未设置时，base bundle 把遥测指向 `https://harness-telemetry.deepseeksvc.com/v1/logs`（[cordis.patch.yml](../../../../packages/bundle/base/cordis.patch.yml)），而桌面更新器把生产 origin 固定为 `https://download.deepseek.com`（[desktop-auto-update-environment.mjs](../../../../apps/desktop/scripts/desktop-auto-update-environment.mjs)）。两者都是 fork 的分发决策，而不是实现细节。

**桌面通道没有 CI。** [apps/desktop/README.md](../../../../apps/desktop/README.zh.md) 记录并实现了打包、签名、公证、通道元数据和对象存储上传，但没有任何 workflow 运行它；每个目标都是一条需要特定平台机器和密钥的手工本地命令。

**Python 分发包名属于上游。** [python/sdk/pyproject.toml](../../../../python/sdk/pyproject.toml) 仍发布 `deepseek-harness-sdk`，[python/sdk-runtime/pyproject.toml](../../../../python/sdk-runtime/pyproject.toml) 发布 `deepseek-harness-runtime-bin`；公共 PyPI 的名称先到先得且上游已占用，因此 fork 无法发布这两个名字，必须在改名、换地方发布或不发布之间作出选择。

## 提案

### 1. 唯一事实表：产物、tag、workflow、目的地

| 表面 | 产物 | 版本基线与 tag | Workflow | 目的地 | 使用方路径 |
|---|---|---|---|---|---|
| dsh npm | `@xneog/dsh` 以及可发布的 `packages/*/*` 与 `apps/*` 成员 | 单一族版本，`dsh-v<version>` | [release.yml](../../../../.github/workflows/release.yml) 打包，[release-publish.yml](../../../../.github/workflows/release-publish.yml) 发布 | npmjs.com 的 `@xneog` scope | `npm install -g @xneog/dsh`、`npx @xneog/dsh web` |
| vendor npm | 九个 `vendor/*` Cordis 包 | 每个包独立，`vendor-<package>-v<version>` | [release-vendor.yml](../../../../.github/workflows/release-vendor.yml) 打包，[release-vendor-publish.yml](../../../../.github/workflows/release-vendor-publish.yml) 发布 | npmjs.com | 作为 dsh 包的依赖 |
| native npm | `native/system/packages/*` | 族版本，`node-addon-system-v<version>` | [node-addon-system-release.yml](../../../../.github/workflows/node-addon-system-release.yml) | npmjs.com | 可选的平台依赖 |
| Python SDK | `deepseek-harness-sdk` 加五个运行时 wheel | `python-v<version>` | [python-release.yml](../../../../.github/workflows/python-release.yml) | 公共 PyPI，受下文决策约束 | `pip install deepseek-harness-sdk` |
| 文档站点 | `docs/` 的 VitePress 投影 | 来自 `dsh-v*` 的已发布快照 | [docs-pages.yml](../../../../.github/workflows/docs-pages.yml) | GitHub Pages | 浏览器 |
| 落地页 | `website/public/landing/` | `main` | 并入下文唯一的 Pages 部署 | 同一个 GitHub Pages 站点 | 浏览器 |
| 桌面 | 已签名安装包加更新元数据 | dsh 族版本 | 手工 `package:*` 与 `upload:*` 目标，外加下文 CI 通道 | fork 的下载 origin 与对象存储桶 | 从站点下载 |
| 源码 | git 仓库 | `main` | 无 | GitHub | `git clone` 后 `pnpm dsh web` |

族的维度保持现状：[scripts/release/families.ts](../../../../scripts/release/families.ts) 负责成员发现、版本基线、tag 前缀和发布顺序，本计划不新增第二处按族分支的代码。

### 2. 发布顺序与本地/CI 边界

每个族保留自己的 bump、pack 和 publish。本计划确定一次完整发布跨族执行的顺序。

1. 本地执行 `pnpm release:dsh <version>`，提交各 manifest 与 lockfile，再合并到 `main`；已发布版本必须能从仓库读到，因此 CI 永不写入版本。
2. 打 `dsh-v<version>` tag 并触发 `release-publish.yml`；它打包该 tag 的树，按依赖顺序发布，并跳过 registry 中 integrity 已一致的所有版本。
3. 仅在 dsh 族发布完成后，为发生变更的包打 tag 并运行 vendor 序列；二进制变更时运行 native 序列；SDK 变更时运行 Python 序列。
4. 用同一个 `dsh-v*` tag 运行 `docs-pages.yml`，让站点呈现的正是已发布的快照。
5. 最后为同一版本打包并上传桌面目标；更新器绝不能宣传 npm 族尚未发布的版本。
6. 为每个 `dsh-v*` tag 创建一个 GitHub Release 作为面向人的账本：发布说明、npm tarball 摘要、桌面产物摘要，以及文档部署链接。目前没有任何 workflow 创建 Release，这是本计划唯一新增的自动化。

### 3. 首次公开发布前必须落地的 fork 专属事项

**npm。** 创建 `@xneog` scope，并为三个发布 workflow 配置 Trusted Publishing（OIDC），或把本地 [publish-npm-baseline.ts](../../../../scripts/publish-npm-baseline.ts) 路径记录为受支持的兜底方案。仓库中不应存在长期 registry token。

**Pages。** 只交付一个 workflow 和一个站点：落地页现在位于 `website/public/landing/index.html`，因此文档构建会把它输出到 VitePress 产物旁的 `/landing/`，独立的落地页 workflow 已删除。`docs-pages.yml` 从 `actions/configure-pages` 推导项目页 base，不再需要固定的 `DOCS_BASE` 值。

**端点。** 把遥测行指向 fork 自己的收集端，或默认关闭；桌面生产 origin 改为由 fork 控制。开源分发不应向用户从未配置过的上游主机打电话。

**Python。** 要么保留上游分发包名且不发布它们，要么改名为 `xneog-harness-sdk` 与 `xneog-harness-runtime-bin`，并在同一改动中更新 import 模块、协议身份 `serverInfo.name`、锁定同版本的运行时依赖，以及所有已记录的命令。只有当 fork 把 Python SDK 作为一等表面维护时，改名才是正确的终局。

**桌面。** 手工目标命令仍是打包接口，[desktop-release.yml](../../../../.github/workflows/desktop-release.yml) 是 CI 通道：它在各目标的原生 runner 上打包，拒绝 npm 尚未发布的 dsh 版本，并把上传限制在 `desktop-release` 环境之后。剩余决策是通道策略（stable 加 alpha）以及由哪台 runner 持有 Windows EV token。

### 4. 进展

不依赖凭据的事项已于 2026-09-09 交付：

- **Pages：** 落地页移到 `website/public/landing/`，第二个 Pages workflow 已删除；`docs-pages.yml` 是唯一部署，文档构建会输出 `/landing/`。
- **遥测：** base bundle 默认 `DISABLED`，不再携带上游 OTLP 兜底；开启需同时设置 `DSH_TELEMETRY_MODE=FEEDBACK_ONLY` 与 `DSH_TELEMETRY_OTLP_URL`。
- **桌面 origin：** 打包与上传读取 `DOWNLOAD_PROD_ORIGIN`；固定的上游主机已从解析器和 README 中移除。
- **来源证明：** dsh 与 vendor 的发布脚本传入 `--provenance`，native 发布脚本同样如此，dsh 与 vendor 的 publish job 授予 `id-token: write`。
- **桌面通道：** [desktop-release.yml](../../../../.github/workflows/desktop-release.yml) 与 [desktop-release.spec.ts](../../../../scripts/tests/desktop-release.spec.ts) 固定了手工触发、三个目标、版本门禁与受控上传。

剩余事项：`@xneog` scope 与 OIDC 注册、Python 改名决策、GitHub Release 账本 workflow，以及桌面签名密钥。

### 5. 校验、来源证明与回滚

每个表面在上传前都已校验。`release:verify` 拒绝并非来自该族 tag 的触发，`release:verify-packed-install` 驱动已安装的可执行文件，Python workflow 校验文件名、元数据、体积上限和 SHA-256 摘要，桌面上传要求完成记录与环境、目标、公开 URL 和版本一致。本计划保留这些，并增加三项。

- **来源证明：** 在三个发布 job 上启用 npm provenance 证明，复用 Trusted Publishing 已提供的同一 OIDC 身份。
- **账本：** 每个 Release 正文列出所有表面的已发布版本与摘要，使撤回决策事后可审计。
- **按 registry 的回滚规则：** npm 用 deprecate（版本不可变），PyPI 用 yank（文件不可变），Pages 重新部署上一个 tag，桌面重新上传上一个通道元数据；桌面历史对象永不删除。

## 备选方案

**四个产物族共用一条流水线。** 否决：各族在版本基线、构建机器和变更频率上都不同，共用流水线会在每次产品发布时重新发布未变化的 vendor 与 native 包。[Private npm publication as three independent sequences](../../implemented/process/2026-08-10-npm-release-sequences.zh.md) 记录了拆分原因，并继续作为其内部机制的权威。

**用一个发布 tag 发布所有表面。** 否决：vendor 与 native 序列发布按包独立推进的版本，Python 的 tag 拼写也已不同，单个 tag 无法命名它们。

**把 GitHub Releases 作为主通道。** 否决：用户实际运行的路径是 npm、pip 和浏览器；Release 归档只会新增第四个需要校验的产物，而无法替代任何一个。它只作为面向人的账本。

**现在就给 Python 分发包改名。** 延后而非否决：对一等 fork SDK 而言改名是正确的，但它牵涉 import 模块、协议身份、锁定同版本的运行时依赖以及每一份文档。本计划把 Python 表面的发布门槛设为该决策，而不是先发布上游的名字。

## 验收标准

- 单个 `main` 树通过 `pnpm run check:ci:static`、`pnpm run build`，以及宿主平台的桌面打包测试。
- 恰好一个 workflow 部署 GitHub Pages 站点，且全新克隆能以为项目页设置的 `DOCS_BASE` 构建该站点。
- 除用户用自己密钥配置的 LLM API 端点外，任何随产品发布的默认值都不指向 `deepseek.com` 或 `deepseeksvc.com` 主机。
- 四个 registry 各自都能由 dispatch workflow 使用 OIDC 凭据从 tag 发布，仓库中没有长期 token，且每次发布重复运行都是幂等的。
- 每个 `dsh-v*` tag 对应一个 GitHub Release，列出所有已发布版本与摘要。
- 每个 registry 的回滚演练都能在不删除不可变历史的前提下完成：npm deprecate、PyPI yank、Pages 重新部署、桌面元数据回退。
- `npm install -g @xneog/dsh`、`npx @xneog/dsh web`、文档记录的 Python 路径，以及桌面下载，都能在干净机器上仅用已发布产物成功完成。

## 风险

**发布了错误的树。** tag 可能指向版本不匹配的提交；`release:verify` 与版本一致性门禁会拦住它，本计划把 bump、合并、打 tag 的顺序设为强制要求而非惯例。

**fork 身份漂移。** 改名是一次变换，因此未来的上游同步可能重新引入上游主机或名称；变换规则集与端点检查必须一起修改，这正是把端点默认值列为验收标准而不是清理项的原因。

**桌面成本与节奏。** 每次发布三个签名与公证目标需要付费账号和专用机器。在 CI 通道存在之前，桌面发布保持手工并可能落后于 npm 族，因此更新器通道元数据绝不能指向未发布的版本。

**Python 的模糊性。** 让上游名字留在公共 PyPI 上不是一个选项，因此在改名决策落地前该表面保持未发布；TypeScript 使用方不受影响，Python 用户继续使用 [INSTALL.md](../../../../INSTALL.md) 中记录的源码安装方式。
