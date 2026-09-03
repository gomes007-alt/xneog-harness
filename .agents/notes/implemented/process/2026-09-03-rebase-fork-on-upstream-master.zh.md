# Agent Note: 将 xneog fork 变基到上游 dsh master

Status: implemented

[English](2026-09-03-rebase-fork-on-upstream-master.md) | 中文

## 问题

xneog fork 停留在上游 `deepseek-harness` 2026-08-17 的快照上，而上游已推进到 `dsh-v0.1.2-rc.1`（新增 webhook 与 experimental 包、SDK 服务 profiles、snapshots/、locale 拥有的客户端 UI 文案，以及 single-dsh-application-launcher 规则）。fork 与上游没有共享历史，任何 merge 或 rebase 都无法跟踪上游。

## 决策

在上游之上重放 fork。将上游演进补丁（2026-08-17 → master）应用到 fork 快照，并机械地重新应用整树 rebrand：npm scope `@deepseek-ai/*` → `@xneog/dsh-*`（CLI 包 `@xneog/dsh`）、可见品牌 → xneog、仓库 URL → `gomes007-alt/xneog-harness`、默认 Harness home `~/.xneog-harness`。Python SDK 保留其上游发行名称与控制台命令；vendor 来源与归档 Agent Note 保留其事实性的上游名称；冻结归档与每条翻译配对记录都为 rebrand 后的快照重新封印。fork 自身的 19 个提交用 `git rebase --rebase-merges` 重放在其上：fork 的改动已被吸收时采纳上游内容（仓库 URL、deleteSession），仍适用时保留 fork 意图（README fork 声明、xneog 标记、web 应用的 `xneog web:` 打印、CI 裁剪到 Pages 部署、手持视口修复）。

标记清理补全了 fork 在上游快照之后新增文件上的 rebrand：`BrandMark` 渲染 fork 的占位 x 而不是继承的鲸鱼，hero swim morph 及其 `FISH_LOGO_*` 几何被静态标记加 CSS bob 取代，`FishLogo` 导出已移除。official-brand 包保留鲸鱼，因为它的全部用途就是 DeepSeek 身份。

## 后果

`main` 是上游 master 的线性 rebrand 加上 fork 自己的提交；此后每次上游推进都应用相同的机械变换，只有上游触碰变换产生的品牌行时才会冲突。冻结归档 manifest 与翻译 sidecar 已在 sync 提交中重新记录，因此各 gate 以新快照而非 sync 前状态为基准比较。
