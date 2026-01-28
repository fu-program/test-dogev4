const express = require('express');
const http = require('node:http');
const path = require('node:path');
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');
const app = express();
const server = http.createServer(app);

// 1. UI（publicフォルダ）を表示する設定
app.use(express.static(path.join(__dirname, 'public')));

// 2. Ultraviolet（プロキシエンジン）の設定
app.use('/uv/', express.static(uvPath));

// 3. サーバー起動の設定（Render用）
const port = process.env.PORT || 8001;
server.listen(port, () => {
    console.log(`Doge is running on port ${port}`);
});