// 图书管理系统后端服务
const express = require('express');
const cors = require('cors');
const path = require('path');

// 创建Express应用
const app = express();

// 中间件配置
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析JSON请求体

// 检测是否在Vercel环境中
const isVercel = process.env.VERCEL_ENV === 'production' || process.env.VERCEL_URL;

// 使用内存存储代替文件存储（适合Vercel环境）
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

// 读取图书数据
function readBooks() {
  return books;
}

// 保存图书数据
function saveBooks(updatedBooks) {
  books = updatedBooks;
}

// API路由

// 获取所有图书
app.get('/api/books', (req, res) => {
  const books = readBooks();
  res.json(books);
});

// 添加图书
app.post('/api/books', (req, res) => {
  const books = readBooks();
  const newBook = req.body;

  // 确保图书有唯一ID
  newBook.id = Date.now();

  books.push(newBook);
  saveBooks(books);

  res.status(201).json(newBook);
});

// 更新图书
app.put('/api/books/:id', (req, res) => {
  const books = readBooks();
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: '图书未找到' });
  }

  books[bookIndex] = updatedBook;
  saveBooks(books);

  res.json(updatedBook);
});

// 删除图书
app.delete('/api/books/:id', (req, res) => {
  const books = readBooks();
  const bookId = parseInt(req.params.id);

  const filteredBooks = books.filter(book => book.id !== bookId);

  if (filteredBooks.length === books.length) {
    return res.status(404).json({ message: '图书未找到' });
  }

  saveBooks(filteredBooks);

  res.json({ message: '图书删除成功' });
});

// 提供静态文件服务 - 使用绝对路径确保在Vercel环境中正常工作
const path = require('path');
app.use(express.static(path.join(process.cwd())));

// 处理根路径请求
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// 处理index.html直接访问
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// 启动服务器
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器已启动，监听端口 ${PORT}`);
  console.log(`API文档: http://localhost:${PORT}/api/books`);
  console.log(`前端页面: http://localhost:${PORT}/index.html`);
  console.log('\n=== 网络访问信息 ===');
  console.log('服务器已配置为允许来自所有网络的访问');
  console.log('请确保手机和电脑连接在同一WiFi网络下');
  console.log('手机访问地址格式: http://[电脑IP地址]:3000/index.html');
});