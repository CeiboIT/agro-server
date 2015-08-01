var express = require('express');
var router = express.Router();

var data_queue = [];

/**
*  Data from sensors is: {'lx': lx, 'env_tmp': tmp_rh['tmp'], 'env_rh': tmp_rh['rh'], 'soil_rh': rh_soil}
**/

/* GET sensors_data listening. */
router.get('/', function(req, res, next) {
  var sensors_data = undefined;
  console.log(data_queue);
  if (data_queue.length > 0){
    sensors_data = (data_queue.length == 1)? data_queue[0] : data_queue.shift();
  }
  res.json(sensors_data);
});

router.post('/', function(req, res) {
  var sensors_data = req.body;
  var d = new Date();
  var n = d.getTime()
  sensors_data.timestamp = n; //timestamp in milis
  data_queue.push(sensors_data);
  res.status(200);
  res.json({status_msg: 'OK'});
});

module.exports = router;
