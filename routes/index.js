var express = require('express');
var router = express.Router();
var abc = [];
/* GET home page   */
router.get('/', function(req, res)  {
  abc = req.session.key;
  var xyz = {abc}
  xyz = JSON.stringify(abc);
    // console.log(xyz);
    // console.log(typeof(xyz))
  if(req.session.key)   
  res.render('todo.html', {abc : xyz})
});
router.post('/', function(req, res) {
    req.session.key.push(JSON.parse(JSON.stringify(req.body)));
    // console.log(req.body)
    // console.log(req.session.key);
    res.json(req.body.myWork) 
})
router.post('/post', function(req, res) {
    const del = req.body.delId;
    console.log(del);
    abc.splice(del,1);
    console.log(abc);
    req.session.key = abc ;    
    // xyz.splice(del, 1);
    // console.log(xyz);
})
// router.get('/a', function(req, res, next) {
//     req.session = req.body.key;
// });
module.exports = router;
