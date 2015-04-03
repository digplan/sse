# sse
````
var express = require('express');
var app = express();

var sse = require('sse');
app.all('/feed', sse.handle);
app.listen(80);

app.all('/', function(r, s){
  s.sendfile('index.html');
})

sse.send('this text);
````
