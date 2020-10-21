var express = require('express');
var fs = require('fs');
var dict = fs.readFileSync('bro.json');
dict = JSON.parse(dict);


var app = express();
const port = process.env.PORT || 4000;
var server = app.listen(port, listening);

function listening(){
  console.log('listening at port ' + port + '...');
}

app.use(express.static('Public'));

app.get('/bro', getData);

function getData(request, response){
  response.send(dict);
}

//ading memes
app.get('/add/:key/:value', function(req, res){
  key = req.params.key;
  if (!dict.hasOwnProperty(key)) {
    value = req.params.value;
    //can't have / in a route
    value = value.replace(/\*/g, "/");
    dict[req.params.key] = value;
    stringDict = JSON.stringify(dict);
    fs.writeFile('bro.json', stringDict, listening);
    res.send(key + "/" + value);
  } else {
    res.send("there is already a meme called " + key);
  }
});

//deleting memes
app.get('/del/:key', function(req, res){
  key = req.params.key;
  if (dict.hasOwnProperty(key)) {
    delete dict[key];
    stringDict = JSON.stringify(dict);
    fs.writeFile('bro.json', stringDict, listening);
    res.send(key + " has been deleted");
  } else {
    res.send("there is no meme called " + key);
  }
});
