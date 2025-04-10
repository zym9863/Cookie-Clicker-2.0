[English Version](README_EN.md) | [中文版](README.md)

# Cookie Clicker 2.0

基于React + TypeScript + Vite构建的现代化Cookie Clicker游戏。

## 项目特色

- 使用React Hooks和TypeScript实现游戏逻辑
- 响应式UI设计，适配不同设备
- 游戏数据持久化存储
- 升级系统和成就系统

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **语言**: TypeScript
- **样式**: CSS Modules

## 项目结构

```
src/
├── assets/            # 静态资源
│   ├── cookie_icon.png
│   └── upgrade_icon.png
├── components/        # 组件
│   └── CookieClicker.tsx
├── types/             # 类型定义
│   └── game.ts
├── App.tsx            # 主组件
└── main.tsx           # 入口文件
```

## 运行项目

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

## 扩展配置

如需扩展ESLint配置，请参考原模板说明。
