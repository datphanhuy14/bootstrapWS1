var express = require('express');
var router = express.Router();

/* GET home page   */
router.get('/', function(req, res)  {
  var abc = req.session.key;  
  if(req.session.key) 
  res.render('todo.html', {abc : abc })
});
router.post('/', function(req, res) {
    req.session.key.push(req.body);
    console.log( req.session.key);
    res.json(req.body.myWork) 
})

// router.get('/a', function(req, res, next) {
//     req.session = req.body.key;
// });
module.exports = router;
