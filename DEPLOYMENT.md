
# 部署指南

## 🚀 最简单的部署方式 - Vercel (推荐)

Vercel 对 Vite 项目有完美的支持，部署非常简单！

### 方法一：使用 Vercel CLI 部署

1. **安装 Vercel CLI** (如果还没有安装)
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```
   
   按照提示操作即可，第一次部署后会给您一个预览地址。

4. **生产环境部署**
   ```bash
   vercel --prod
   ```

### 方法二：使用 Git + Vercel 自动部署

1. 在 GitHub/GitLab/Bitbucket 创建一个仓库
2. 推送代码到仓库
3. 访问 [vercel.com](https://vercel.com) 并导入您的仓库
4. Vercel 会自动检测这是一个 Vite 项目并完成部署

## 📦 其他部署选项

### Netlify
1. 访问 [netlify.com](https://netlify.com)
2. 拖拽 `dist` 文件夹到上传区域
3. 或者通过 Git 仓库自动部署

### GitHub Pages
1. 构建项目：`npm run build`
2. 将 `dist` 文件夹的内容推送到 GitHub 仓库的 `gh-pages` 分支
3. 在仓库设置中开启 GitHub Pages

### Cloudflare Pages
1. 访问 [pages.cloudflare.com](https://pages.cloudflare.com)
2. 连接您的 Git 仓库或直接上传 `dist` 文件夹
3. 配置部署设置（Vite 项目会自动识别）

## 📝 本地预览构建结果

如果您想在本地预览构建后的效果：
```bash
npm run preview
```

## 🎉 项目已构建完成

构建产物在 `dist/` 文件夹中，您可以直接将该文件夹部署到任何静态托管服务！
