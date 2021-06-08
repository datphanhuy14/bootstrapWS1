var express = require('express');
var router = express.Router();
var abc = [];
/* GET home page   */
router.get('/', function(req, res){
  console.log("key 1 :"+ req.session.key)
  console.log("key 2 :"+ req.session.key2)

  if(req.session.key2 != null) {
    abc = [...req.session.key2]; 
    var xyz = {abc}  
    xyz = JSON.stringify(abc); // String Json - JSON
      // console.log(xyz);
      // console.log(typeof(xyz))
    if(req.session.key)   
    res.render('todo.html', {abc : xyz})}
  else {
  abc = [...req.session.key];  // Gán mảng abc = value session.key   
  var xyz = {abc}  //  Session bị bọc bởi mảng nên cần loại bỏ để không bị lỗi lúc truyền sang client;
  xyz = JSON.stringify(abc); // String Json - JSON
    // console.log(xyz);
    // console.log(typeof(xyz))
  if(req.session.key)   
  res.render('todo.html', {abc : xyz})
  }
});
router.post('/', function(req, res) {
    if(req.session.key2 == null) {
      req.session.key.push(JSON.parse(JSON.stringify( req.body))); // delete [Object:  undefined ]
      // console.log(req.body)
      // console.log(req.session.key);
      res.json(req.body.myWork)}
    else {
      req.session.key2.push(JSON.parse(JSON.stringify(req.body))); // delete [Object:  undefined ]
      // console.log(req.body)
      // console.log(req.session.key);
      res.json(req.body.myWork)}
    })
router.post('/checkbox', function(req, res){
  const chk = req.body.checkbox;
  console.log(chk);
    if (req.session.key.checkedbox == false)
    req.session.key.checkedbox = true;
    else 
    req.session.key.checkedbox = false;
    // Change html ...
})
router.post('/post', function(req, res) {
    const del = req.body.delId;
    console.log(del);
    abc.splice(del,1);
    console.log(abc)
    req.session.key2 = [...abc];
    var xyz = {...req.session.key2}
    xyz = JSON.stringify(req.session.key2)
    res.render('todo.html', { abc : req.session.key2})

})
// router.get('/a', function(req, res, next) {
//     req.session = req.body.key;
// });
module.exports = router;
