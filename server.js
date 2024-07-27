const http = require('http');
const https = require('https');
const fs = require('fs');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const HTTP_PORT = process.env.HTTP_PORT;
  const HTTPS_PORT = process.env.HTTPS_PORT;

  const httpServer = http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const httpsServer = https.createServer(
    {
      cert: fs.readFileSync(`${process.env.HTTPS_CERT_PATH}.pem`),
      key: fs.readFileSync(`${process.env.HTTPS_KEY_PATH}.pem`),
    },
    (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    },
  );

  httpServer.listen(HTTP_PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${HTTP_PORT}`);
  });

  httpsServer.listen(HTTPS_PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${HTTPS_PORT}`);
  });
});
