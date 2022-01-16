const http = require('http');
const url = require('url');
const fs = require('fs');

// Executado apenas uma vez, por isso Síncrono
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

// Server and Routs
// Overview page
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === 'overview') {
    res.writeHead(200, { 'Conteten-type': 'text/html' });
    res.end(tempOverview)

    // Product page
  } else if (pathName === '/product') {
    res.end('Product!')

    // API
  } else if (pathName === '/api') {
    res.writeHead(200, { 'Conteten-type': 'application/json' });
    res.end(data);

    // Not found
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