// 本地静态预览服务器（带 CORS），serve 模板根目录
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = 'D:/STcard2test/tavern_helper_template';
const port = 5500;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.map': 'application/json',
  '.svg': 'image/svg+xml',
};

http
  .createServer((req, res) => {
    let url;
    try {
      url = decodeURIComponent(req.url.split('?')[0]);
    } catch {
      url = req.url.split('?')[0];
    }
    if (url.includes('..')) {
      res.writeHead(403);
      res.end('forbidden');
      return;
    }
    const file = path.join(root, url === '/' ? 'index.html' : url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('not found: ' + url);
        return;
      }
      res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`[preview-server] http://localhost:${port} (root: ${root})`);
  });
