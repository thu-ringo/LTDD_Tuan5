import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.json': 'application/json', '.png': 'image/png', '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.woff2': 'font/woff2' };
export function startServer(port = 4173) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const path = resolve(root, '.' + decodeURIComponent(url.pathname));
      if (!path.startsWith(resolve(root) + sep) && path !== resolve(root)) {
        res.writeHead(403).end();
        return;
      }
      let data;
      let extension = extname(path);
      try { data = await readFile(path); } catch {
        if (extension) { res.writeHead(404).end(); return; }
        data = await readFile(resolve(root, 'index.html'));
        extension = '.html';
      }
      res.writeHead(200, { 'Content-Type': mime[extension] || 'application/octet-stream' });
      res.end(data);
    } catch { res.writeHead(500).end(); }
  });
  return new Promise(resolve => server.listen(port, '127.0.0.1', () => resolve(server)));
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await startServer();
  console.log('Lab06: http://127.0.0.1:4173');
}
