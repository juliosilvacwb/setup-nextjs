const { createServer } = require('http');
const { join } = require('path');
const { parse } = require('url');
const next = require('next');
var enforce = require('express-sslify');

const port = process.env.PORT || 3001;

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()


app.prepare()
  .then(() => {
    createServer((req, res) => {

      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
      }

      // handle GET request to /service-worker.js
      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname)

        app.serveStatic(req, res, filePath)
      } else {
        handle(req, res, parsedUrl)
      }
    })
    .listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })