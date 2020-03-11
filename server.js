const { createServer } = require('http');
const { join } = require('path');
const { parse } = require('url');
const next = require('next');
const express = require('express');

const port = process.env.PORT || 3002;
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {

    const httpApp = express();

    if ( process.env.NODE_ENV !== 'production') {
      httpApp.get("*", (req, res) => {
        console.log(`user came to http :/`);
        res.writeHead(302, {
          Location: "https://" + req.headers.host + req.url
        });
        res.end();
      })
    }

    createServer((req, res) => {

      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      // handle GET request to /service-worker.js
      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname)

        app.serveStatic(req, res, filePath)
      } else {
        handle(req, res, parsedUrl)
      }
    }).listen(port, () => {
      console.log(`> Ready on ${port}`)
    })
  })