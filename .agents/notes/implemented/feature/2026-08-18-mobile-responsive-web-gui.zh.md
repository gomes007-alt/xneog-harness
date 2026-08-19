# Agent Note：移动端响应式 Web GUI —— iPhone 安全区、动态视口与触控目标下限

Status: implemented

[English](2026-08-18-mobile-responsive-web-gui.md) | 中文

## Problem

Web GUI 已具备可用的窄视口骨架（ui-layout 在 1024px 以下自动将侧栏收起为 56px 轨道，列求解器在中央列将跌破 640px 时关闭详情面板），但其在 iOS 设备上的呈现存在四个缺陷。其一，iPhone 的全面屏硬件被忽略：壳的 viewport meta 没有 `viewport-fit=cover`，任何组件都没有使用 `env(safe-area-inset-*)`，因此刘海遮挡侧栏轨道顶部、Home 指示条遮挡输入框底部（横屏刘海侧同理）。其二，所有以 `100vh` 限定高度的浮层（菜单、对话框、灯箱）都会在 Safari 地址栏收起时越界，留下被截断的尾部或多余留白。其三，多个文本输入框字号低于 16px，iOS Safari 聚焦时会强制缩放页面。其四，多个控件未达到 44px 的 HIG 触控下限：输入框的附加（+）按钮为 28px、回到底部按钮为 34px、侧栏轨道控件为 36px。

## Decision

响应式设备几何适配由各样式所在的模块自行负责；不引入新的全局样式表。

- 壳（`apps/web/index.html`）开启全面屏布局：viewport meta 增加 `viewport-fit=cover`，并加入亮色/暗色两套 `theme-color` meta。
- 壳的全局基础层（`packages/client/web/src/base.css`）承载平台底线：`html, body, #root` 的高度链在 `@supports (height: 100dvh)` 下升级为 `100dvh`；`html` 增加 `-webkit-text-size-adjust: 100%`、`text-size-adjust: 100%` 与 `-webkit-tap-highlight-color: transparent`；`html, body` 设置 `overscroll-behavior: none`；在 `(pointer: coarse)` 下所有可点击元素获得 `touch-action: manipulation`，同时所有文本输入（`input` 的 text/search/email/url/number/password/tel、`textarea`、`select`）统一钉在 `font-size: 16px !important` —— `!important` 是必须的，因为插件样式表在壳样式之后才由运行时注入。
- 每个功能模块在自己的局部类上承载 `@media (max-width: …)` 安全区内边距与 `(pointer: coarse)` 触控尺寸：侧栏根与轨道（`ui-sidebar` SidebarRoot）、输入框根与附加控件（`ui-conversation` InputBar）、消息区滚动内边距与回到底部（`ui-conversation` ChatView）、问题与计划复核框架（`ui-user-questions`）、Toast 定位（`ui-primitives` Toast）、图片灯箱框架与关闭按钮（`ui-attachment` ImageLightbox）。
- 以视口限高的菜单与对话框在各处通过 `@supports (height: 100dvh)` 把 `100vh` 升级为 `100dvh`（Menu scrollable、模型选择菜单、子代理目录菜单、引导弹窗 content、灯箱图片）；沿用既有 RiskConfirmation 的 `@supports` 模式。
- 手机端对话框圆角由 24px 柔化为 20px（`ui-primitives` Modal）。

## Alternatives considered

- **单一全局响应式样式表并指向哈希后的模块类名** —— 拒绝：CSS Modules 的哈希随打包器而异（壳为 Vite 的 `_name_hash_n`，插件为 tsdown 的 `<bundle-hash>_<name>`），跨包全局表无法可移植地命中组件类；每条规则必须与其声明所在的类同处一文件。（哈希覆盖层曾作为线上 dist 的验证载体使用过一次，但它不是可维护的源码产物。）
- **整体布局级的移动端改造（底部导航、抽屉式侧栏）** —— 拒绝：这是未经请求的产品变更；现有的轨道 + 自动收起已经产生可用的窄屏布局，本笔记只修正设备几何，不改信息架构。
- **以 `user-scalable=no` 阻止聚焦缩放** —— 以无障碍为由拒绝：16px 字号下限在保留双指缩放的同时消除了缩放问题。
- **全局使用 `!important`** —— 拒绝：源码侧规则位于声明模块内，可按层叠顺序获胜；唯一的 `!important` 是壳基础层中粗指针的 16px 字号下限，它必须压过之后注入的插件样式。

## Consequences

- 不引入新的全局样式表：插件 CSS 隔离不变式（包内联注入的 `<style data-plugin=…>`）得以保留，安全区规则保持逐组件存在。
- 安全区规则依赖壳的 `viewport-fit=cover`；没有它的壳会得到零内边距并退化为先前行为。
- 粗指针 16px 下限会把触控设备上的小号字段文字（如 13px 的搜索与目标输入框）略微放大；作为消除缩放问题的代价予以接受。
- 44px 的轨道控件占满 56px 轨道宽度；悬停显现的交互提示不受影响。
- 验证方式：规则先作为 dist 级覆盖层在运行中的 GUI 上验证，再逐条移植到所属模块；本次改动仅涉及 CSS/meta，`test:gui` 行为覆盖不受影响，组装态浏览器验证归 Web 测试层负责。
