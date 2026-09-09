# Agent Note: 将 xneog fork 变基到上游 dsh 0.1.3-alpha.1

Status: implemented

[English](2026-09-04-rebase-fork-on-upstream-0.1.3.md) | 中文

## 问题

上游在 fork 的 0.1.2-rc.1 同步之后前进了 229 个提交并打出 `dsh-v0.1.3-alpha.1`：会话格式 v2 及其相邻的 v0→v1→v2 迁移、后台文件上传服务、Windows 子窗口与盘符根加固、JSONL 后端的跨进程写租约、skill/slash-token 的 Web 打磨，以及 macOS x64 Python wheels。fork 的会话日志（winserver，格式 v0）必须能通过新的迁移链继续读取。

## 决策

重新执行同步流水线：对上游 `d347e7039` 做整树 rebrand 变换（npm scope `@deepseek-ai/*` → `@xneog/dsh-*`、可见品牌 → xneog、仓库 URL → `gomes007-alt/xneog-harness`、Harness home `~/.xneog-harness`），重新封印冻结归档与翻译记录，然后直接重新应用 fork 自身的增量（旧提交对移动过的上游已变成空提交，不再 cherry-pick）：xneog 占位标记（BrandMark 渲染 x、official-brand 自带鲸鱼几何、hero swim morph 与 `FISH_LOGO_*` 被静态标记加 CSS bob 取代）、fork 的 README 声明、`SessionPersistence.delete` 及其 JSONL 实现与 workspace `deleteSession`（在新租约代码旁重新插入，未知会话拒绝带操作名）、`xneog web:` 打印与发布探针、CLI 脚本别名。上游 0.1.3 的 CI workflows 予以保留（对齐）。

## 备选方案

**把 fork 的旧提交 rebase 或 cherry-pick 到移动过的上游之上。** 否决：整树 rebrand 使这些提交相对上游的树变成空提交，重放只会在每一行品牌内容上产生冲突，却带不回 fork 的意图。

**直接让上游合并进 fork。** 否决：fork 与上游没有共同历史，合并没有可用的基线；同步只能是一次整树变换加上一份明确的增量集合。

**只手工移植 fork 需要的上游提交。** 否决：fork 已发布的 v0 会话日志必须通过相邻的 v0→v1→v2 迁移链继续可读，而这条链只存在于完整的上游树中；局部移植会让这些日志无法读取。

## 后果

`main` 是 rebrand 后的上游 0.1.3-alpha.1 加上 fork 的增量；已发布的 v0 会话日志通过上游的相邻迁移链继续可读，因此 winserver 的会话在部署升级后原样保留。今后每个上游版本都重复相同的变换与相同的增量集合。
