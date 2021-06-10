const redis = require('redis')
const client = redis.createClient()

const redisController = function(req, res) {
    // console.log(req.body)
    data.push(JSON.parse(JSON.stringify(req.body)))
    client.set("key", data, redis.print)    
    console.log(data)
    res.json(data)
}
module.exports = redisController;