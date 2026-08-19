# Agent Note：GUI 测试固定改名后的标志、字标与所有者文案

Status: implemented

[English](2026-08-19-gui-tests-pin-rebranded-mark-and-copy.md) | 中文

## 问题

`main` 上有五处 `test:gui` 失败，钉住的是 fork 从上游继承的品牌而非实际发布内容：`icons` 规范断言了已被删除的鲸鱼图形的 23.16×17.04 原生比例，`welcome-notice` 规范断言了改名前的英文所有者文案（两处 "Harness developers"），三个 `ui-sidebar` 快照则钉住了继承的 182×24 字标与折叠栏中的鲸鱼。实际发布的源码是 fork 自己的标志——24×24 盒子里的粗体 x，其注释说明待官方 xneog 标志可用时替换——96×24 的 "xneog" 字标，以及与中文正文一致的英文文案（"developers"，无 "Harness"）；`apps/web/public/favicon.svg` 已使用同一 x 标志。改名更新了源码（[documentation-site-navigation-and-chrome](../process/2026-08-12-documentation-site-navigation-and-chrome.md) 记录了继承的 DeepSeek 标志），却把测试留在了后面。

## 决策

三处测试面现在固定 fork 实际发布的内容，每一处都依据各自证据决定，而非批量刷新快照：

- `icons.client.spec.tsx` 以整串相等断言标志的 `d` 属性——`M6 6 L18 18 M18 6 L6 18`，即 x 的两条对角线。只匹配第一条对角线的子串断言被证明是脆弱的：删除源码中的第二条对角线后规范仍是绿的。否定守卫 `not.toContain('M0 0L23.16')` 予以保留，使鲸鱼路径回归时规范失败。
- `welcome-notice.client.spec.tsx` 逐字钉住当前英文正文，与 `src/onboarding-copy.ts` 相等，并与中文正文的"面向开发者"/"欢迎全球开发者"一致。
- `ui-sidebar` 快照仅对该文件重新录制；经审阅的差异仅限于 viewBox/width/height 与序列化器的 svg 内容指纹。

## 曾考虑的替代方案

**恢复鲸鱼图形与 182×24 字标以满足测试。** 拒绝：占位符注释、favicon 与中文所有者文案都记录着改名是有意为之；恢复继承的标志会撤销它。

**对整个仓库批量 `vitest -u`。** 拒绝：不加限定的重新录制可能掩盖无关的扰动。只重新录制了一个拥有快照的文件，并审阅了其差异。

**删除针对鲸鱼路径的否定守卫。** 拒绝：它是继承标志回归时唯一会失败的绊线，且只花费一条断言。

## 后果

`npm run test:gui` 全绿（273 个文件、3786 条测试）。当官方 xneog 标志落地时，其替换必须同步更新 `BrandMark` 的路径断言与 sidebar 快照——即本次改动拉齐的同一批测试面。所跟踪的改名残留已在后续清理中落地：`FishLogo` 导出改为 `BrandMark`，`railFish` CSS 局部名改为 `railMark`（连同空态 hero 的 `fish`/`fishHitbox` 局部名），README 现说明 fork 关系并指向本仓库。

[AGENTS.md](../../../../AGENTS.md) 要求测试描述已发布的行为；本次改动使三处滞后的测试面重新回到该规则之下。
