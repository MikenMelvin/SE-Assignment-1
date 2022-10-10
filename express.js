var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');
const { getSystemErrorMap } = require('util');


//global variable for tweet data
var tweetinfo = []
var IDfortweets; 

//loads the input file into Express file.
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    tweetinfo = JSON.parse(data);
    
    IDfortweets = tweetinfo.id;
    
  }
});
 


//Get functions
//Shows user info
app.get('/tweet', function(req, res) {
  //TODO: send all users' IDs
  res.send({tweetinfo: tweetinfo});
  
});


//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send({tweetinfo: tweetinfo});
});

//Shows searched tweets
app.get('/tweetinfo', function(req, res){
  //TODO: send searched tweets
  
  res.send({tweetinfo: tweetinfo});
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
  var nameToFind = req.body.name;
  var numberHolder = nameToFind.split(";");
  var newNameID = numberHolder[0];
  var newReference = numberHolder[1];
  tweetinfo.push({
    id: newNameID,
    text: newReference
  });
  res.send('Successfully created product!');
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
  res.send({tweetinfo: tweetinfo});
});

//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets
  var searchedtweet = false;
  
  var nameToFind = req.body.name;
  var numberHolder = nameToFind.split(";");
  var Foundname = numberHolder[0];
  var createdScreenName = numberHolder[1];
  tweetinfo.forEach(function(Usedfor, user){
    if(!searchedtweet && Usedfor.name === Foundname){
      tweetinfo.screen_name = createdScreenName;
    }
  });

});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet
  var id  = req.params.tweetid;
  var searchedtweet = false;
  
  tweetinfo.forEach(function(Usedfor, index){
    
    console.log(res);
    if(Usedfor.id === id){
      tweetinfo.splice(index, 1);
      console.log("Burdayim");
    }
    
  });
  res.send('Successfully deleted product');
  
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});