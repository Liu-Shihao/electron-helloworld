const { app, BrowserWindow } = require('electron');
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');

const server = express();
const port = 3000;
let mainWindow;

//创建桌面窗口
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 设置代理，将请求转发到http://127.0.0.1:5000
server.use('/', createProxyMiddleware({
  target: 'http://127.0.0.1:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/hello'
  }
}));

// 监听端口号
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

