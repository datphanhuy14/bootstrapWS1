var express = require("express");
var router = express.Router();
const redis = require("redis").createClient();
var redisScan = require("redisscan");
const async = require("async");

router.get("/", function (req, res) {
  // REdis Get
  var todoList = [];
  redis.keys("todoList_*", function (err, keys) {
    if (err) return console.log(err);
    async.map(
      keys,
      function (key, cb) {
        redis.get(key, function (error, value) {
          if (error) return cb(error);
          // console.log(value);
          todoList.push(JSON.parse(value));
          cb();
          console.log(todoList)
        });
      },
      function (error, results) {
        if (error) return console.log(error);
        res.render("home.html", { data: todoList });
      }
    );
  });
});
// Post data &
router.post("/", function (req, res) {
  redis.set(
    `todoList_${req.body.id}`,
    JSON.stringify({
      id: req.body.id,
      myWork: req.body.myWork,
      checkbox: req.body.checkbox,
      check: req.body.check,
    }),
  );
  res.json(req.body.myWork); // Tra ve gia tri myWord(content)
});
router.post("/checkbox", function (req, res) {
  // Change key
  console.log(req.body.checkStatus);
  console.log(req.body.idCheck);
  console.log(req.body.myWork);
  // let del2 = `todoList_${req.body.idCheck}` // Del key
  // redis.del(del2)                           // Del key

    // Nếu Trạng thái bằng True thì bật CHECKBOX
  if (req.body.checkbox == 0) {
      check = 1;
    redis.set(`todoList_${req.body.idCheck}`, JSON.stringify({   // Ghi đè lên key redis đang có sẵn
      id: req.body.idCheck,      // id Check = id 
      myWork: req.body.myWork,      // Content
      checkbox: 1,              
      check: "checked",   // String checked 
    })
    );
  }
    // NẾU Trạng thái = false thì tắt checkbox 
  else if (req.body.checkbox == 1) {
    redis.set(`todoList_${req.body.idCheck}`, JSON.stringify({
      id: req.body.idCheck,
      myWork: req.body.myWork,
      checkbox: "0",
      check: " ",  
    })
    );
  }
  else console.log("Error");
});
 //
router.post("/post", function (req, res) {
  var delKey = "todoList_" + req.body.delId;
  console.log(delKey);
  redis.del(delKey);
});

module.exports = router;
