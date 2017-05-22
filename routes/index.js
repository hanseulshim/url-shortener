var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index')
});

router.get('/new/*', function(req, res) {
  var url = req.params[0]
  var validate = /^(http|https):\/\//.test(url)
  var message = ""
  validate ? message = "Url is " + url : message = "Please enter a valid url. Url should start with http:// or https://"
  console.log(randomize())
  res.send(message)
})

function randomize(){
    return Math.floor(Math.random() * (10000 - 1000)) + 1000
}





module.exports = router;