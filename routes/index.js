var express = require("express");
var router = express.Router();
const redis = require("redis").createClient();
var redisScan = require("redisscan");
const async = require("async");

var listValue = [];
var keyId = [];

router.get("/", function (req, res) {
   // REdis Get
    var jobs = [];
    redis.keys('*', function (err, keys) {
        if (err) return console.log(err);
        if(keys){
            async.map(keys, function(key, cb) {
               redis.get(key, function (error, value) {
                    if (error) return cb(error);
                    var todo = {};
                    todo['key']=key;
                    todo['data']=value;
                    cb(null, todo);
                }); 
            }, function (error, results) {
               if (error) return console.log(error);
               console.log(typeof JSON.stringify(results));
               res.render('home.html',{ data :JSON.stringify(results)});
            });
        }
    });

});
// Post data &
router.post("/", function (req, res) {
  redis.set(
    `todoList_${req.body.id}`,
    JSON.stringify({
      id: req.body.id,
      myWork: req.body.myWork,
      checkbox: req.body.checkedbox,
    }),
    function (err, rep) {
      keyId.push(req.body.id);
      console.log(keyId);
    }
  );    
  redis.get(`todoList_${req.body.id}`, function (err, reply) {
    listValue.push(reply);
    console.log(reply);
    console.log(listValue);
  });
  res.json(req.body.myWork);    
});
router.post("/checkbox", function (req, res) {
  // Change  ...
});
router.post("/post", function (req, res) {});

module.exports = router;
