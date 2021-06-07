var express = require('express');
var router = express.Router();

/* GET home page   */
router.get('/', function(req, res)  {
  var abc = req.session.key;
  var xyz = {...abc}
  xyz = JSON.stringify(abc);
  console.log(xyz);
  console.log(typeof(xyz))
  if(req.session.key)   
  res.render('todo.html', {abc : xyz})
});
router.post('/', function(req, res) {



    req.session.key.push(JSON.parse(JSON.stringify(req.body)));
    // console.log(req.body)
    // console.log(req.session.key);
    res.json(req.body.myWork) 
})

// router.get('/a', function(req, res, next) {
//     req.session = req.body.key;
// });
module.exports = router;
