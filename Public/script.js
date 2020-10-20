function setup() {
  loadJSON('bro', processData)
  var button = select('#submit');
  button.mousePressed(submitMeme);
  function submitMeme() {
    var name = select('#name').value();
    //can't have spaces in route
    name = name.replace(/\ /g, '-');
    name = name.toLowerCase();
    var link = select('#link').value();
    //can't have / in route
    link = link.replace(/\//g, "*");
    console.log(name, link);
    try {
      loadJSON('add/' + name + '/' + link);
    }
    finally {location.reload();}
  }
}

function sortOnKeys(dict) {
    var sorted = [];
    for(var key in dict) {
        sorted[sorted.length] = key;
    }
    sorted.sort();
    var tempDict = {};
    for(var i = 0; i < sorted.length; i++) {
        tempDict[sorted[i]] = dict[sorted[i]];
    }
    return tempDict;
}

function processData(data) {
  var dict = sortOnKeys(data);
  var keys = Object.keys(dict);
  var values = Object.values(dict);
  var currentP = 0;
  for(var i = 0; i < keys.length; i++) {
    currentP = document.createElement('p');
    currentP.innerHTML = keys[i] + "   " + values[i];
    document.body.insertBefore(currentP, memes);
    console.log(currentP);
  }
}
