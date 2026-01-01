# 图书管理系统

一个简单的图书管理系统，使用Node.js和Express开发，支持添加、编辑、删除和查询图书。

## 功能特性

- ✅ 查看图书列表
- ✅ 添加新图书
- ✅ 编辑图书信息
- ✅ 删除图书
- ✅ 响应式设计，支持移动端访问
- ✅ 支持本地存储和后端API两种模式

## 技术栈

- **前端**：HTML、CSS、JavaScript
- **后端**：Node.js、Express
- **数据存储**：JSON文件（可扩展为数据库）

## 本地运行

1. 安装依赖
   ```bash
   npm install
   ```

2. 启动服务器
   ```bash
   npm start
   ```

3. 访问应用
   - 前端页面：http://localhost:3000/index.html
   - API文档：http://localhost:3000/api/books

## 部署到Vercel

1. 将代码推送到GitHub仓库
2. 登录Vercel官网（https://vercel.com/）
3. 点击"New Project"，选择GitHub仓库
4. 点击"Import"，然后"Deploy"
5. 部署完成后，通过Vercel提供的URL访问

## API接口

### 获取所有图书
- **方法**：GET
- **URL**：/api/books
- **响应**：图书列表JSON

### 添加图书
- **方法**：POST
- **URL**：/api/books
- **请求体**：图书信息JSON
- **响应**：添加的图书信息

### 更新图书
- **方法**：PUT
- **URL**：/api/books/:id
- **请求体**：更新的图书信息JSON
- **响应**：更新后的图书信息

### 删除图书
- **方法**：DELETE
- **URL**：/api/books/:id
- **响应**：删除成功信息

## 项目结构

```
book-management-system/
├── index.html          # 前端页面
├── server.js           # 后端服务器
├── books.json          # 图书数据文件
├── package.json        # 项目配置
├── vercel.json         # Vercel部署配置
├── .gitignore          # Git忽略文件配置
└── README.md           # 项目说明文档
```

## 许可证

MIT License
