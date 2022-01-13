const http = require('http');
const url = require('url');
const fs = require('fs');

// Executado apenas uma vez, por isso Síncrono
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

// Server and Routs
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === 'overview') {
    res.end('Overview!')
  } else if (pathName === '/product') {
    res.end('Product!')
  } else if (pathName === '/api') {
    res.writeHead(200, { 'Conteten-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    })
    res.end('<h1>Page not found!</h1>');
  }
});

// Listening to requests
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening no requests on port 8000');
}); // event loop, wait for requests