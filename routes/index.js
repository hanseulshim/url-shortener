var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index')
});

router.get('/new/*', function(req, res) {
  var db = req.db
  var inputURL = req.params[0]
  var url = {
         "original_url" : inputURL,
         "short_url": "herokuapp/" + randomize()
      }
  if(validateURL(url)){
      db.collection('url').find({original_url : url.original_url}).toArray((err, results) => {
          if(err) return console.log(err)
          if(results.length > 0){
              console.log(results)
              res.send("This link already exists in the database. Please use herokuapp/" + results[0].short_url)
              res.end()
          }
          else{
              res.json(url)
              db.collection('url').save(url, (err, result) => {
                if (err) return console.log(err)
                res.end()
              })
          }
      })
      
  }
  else{
      res.write("Please enter a valid url. Url should start with http:// or https://")
      res.end()
  }
  
  
  
})

function randomize(){
    return Math.floor(Math.random() * (10000 - 1000)) + 1000
}

function validateURL(url, db){
    if(!/^(http|https):\/\//.test(url.original_url)){
        console.log("Didn't pass validation")
        return false;
    }
    else{
        return true   
    }
}



module.exports = router;