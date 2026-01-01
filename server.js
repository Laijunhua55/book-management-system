// 图书管理系统后端服务 - 适配Vercel环境
const express = require('express');
const cors = require('cors');
const path = require('path');

// 创建Express应用
const app = express();

// 中间件配置
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析JSON请求体

// 使用内存存储图书数据
let books = [
  {
    id: 1,
    name: 'JavaScript高级程序设计',
    author: 'Nicholas C. Zakas',
    publisher: '人民邮电出版社',
    publishDate: '2012-03-01',
    description: 'JavaScript领域的经典之作，全面介绍了JavaScript语言的核心概念和高级特性。'
  },
  {
    id: 2,
    name: 'HTML与CSS设计与构建网站',
    author: 'Jon Duckett',
    publisher: '人民邮电出版社',
    publishDate: '2013-01-01',
    description: '一本精美的HTML与CSS入门书籍，适合初学者学习网页设计。'
  }
];

// API路由 - 获取所有图书
app.get('/api/books', (req, res) => {
  res.json(books);
});

// API路由 - 添加图书
app.post('/api/books', (req, res) => {
  const newBook = {
    ...req.body,
    id: Date.now()
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// API路由 - 更新图书
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ message: '图书未找到' });
  }

  books[bookIndex] = updatedBook;
  res.json(updatedBook);
});

// API路由 - 删除图书
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const initialLength = books.length;

  books = books.filter(book => book.id !== bookId);

  if (books.length === initialLength) {
    return res.status(404).json({ message: '图书未找到' });
  }

  res.json({ message: '图书删除成功' });
});

// 静态文件服务 - 确保能正确访问index.html
app.use(express.static(__dirname));

// 处理所有其他请求，返回index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 只有在直接运行时才启动服务器，Vercel部署时不会调用
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`服务器已启动，监听端口 ${PORT}`);
  });
}

// 导出app，Vercel需要
module.exports = app;
