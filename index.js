// node express server//
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
//..... Body parser : GET,PUT,POST DELETE calls

app.use(bodyParser.json());
app.all('/dishes', (req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
});

app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
 res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
});
 
app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('will send details of the dish ' + req.params.dishId + ' to you');
});

app.post('/dishes/:dishId', (req,res,next)=>{
    res.statusCode = 403;
    res.end('post operation is not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId',(req,res,next)=>{
    res.write('Updating the dish :' + req.params.dishId +'\n');
    res.end('Will update the dish: ' + req.body.name + 'with details: ' + req.body.description);
})
app.delete('/dishes/:dishId', (req,res,next) => {
    res.end('deleting dish'+ req.params.dishId);
});

//----
app.use(express.static(__dirname+ '/public')); // accessing static html files...

app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>hello world</h1></body></html>');
})

const server = http.createServer(app);
server.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}`);
})


// --------------------------------------------------------------------------//
// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const hostname = 'localhost';
// const port = 3000;

// const server = http.createServer((req,res) =>{
//     console.log(req.headers, req.url, req.method);
//     if(req.method === 'GET'){
//         var fileUrl;
//         if(req.url === '/'){
//             fileUrl = '/index.html';
//         }else{
//             fileUrl = req.url;
//         }
//        var filePath = path.resolve('./public' + fileUrl);
//        const fileExt = path.extname(filePath);
//        if(fileExt == '.html'){
//            fs.exists(filePath, (exists) => {
//             if(!exists){
//                 res.statusCode = 404;
//                 res.setHeader('Content-Type', 'text/html');
//                 res.end('<html><body><h1> Error 404:' + fileUrl + ' not found </h1></body></html>');
//                 return;
//             }
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'text/html');
//             fs.createReadStream(filePath).pipe(res);
//            })
//        }else{
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/html');
//         res.end('<html><body><h1> Error 404:' + fileUrl + ' not an html </h1></body></html>');
//         return;

//        }
//     }else{
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/html');
//         res.end('<html><body><h1> Error 404:' + req.method + ' not supported </h1></body></html>');
//         return;
//     }
    
// });
// server.listen(port, hostname, ()=>{
//    console.log(`server running at http://${hostname}:${port}`);
// });