const http=require('http');
const fs=require('fs');
const path=require('path');

const PORT=process.env.PORT||3000;
const ROOT=__dirname;
const TYPES={
  '.html':'text/html; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.svg':'image/svg+xml',
  '.ico':'image/x-icon'
};
const PUBLIC=new Set(['/index.html','/style.css']);

const server=http.createServer((req,res)=>{
  let url=decodeURIComponent((req.url||'/').split('?')[0]);
  if(url==='/')url='/index.html';
  if(!PUBLIC.has(url)){
    res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});
    res.end('Not found');
    return;
  }
  const file=path.join(ROOT,url);
  fs.readFile(file,(err,data)=>{
    if(err){
      res.writeHead(500,{'Content-Type':'text/plain; charset=utf-8'});
      res.end('Server error');
      return;
    }
    res.writeHead(200,{
      'Content-Type':TYPES[path.extname(file)]||'application/octet-stream',
      'Cache-Control':'no-cache',
      'X-Content-Type-Options':'nosniff'
    });
    res.end(data);
  });
});

server.listen(PORT,()=>console.log('ScriptPlace running on http://localhost:'+PORT));
