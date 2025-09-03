// server.js
const express = require('express');
const app = express();
const path = require('path');

// 提供静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});