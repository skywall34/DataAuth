var express = require('express')
var router = express.Router()
let UserModel = require('../models/user_model.js');


//Get the models
let User = UserModel.User;
console.log(User);


//common Functions
//TODO: change these functions for the validation code, this is to test memsql for now
function user_list_template(sql_list){
  var list = '<ul>';
  var i = 0;
  while(i < sql_list.length){
    list = list + `<li><p>User Id: ${sql_list[i].user_id} Username: ${sql_list[i].username} address: ${sql_list[i].address} Description: ${sql_list[i].description}</p></li>`;
    i = i + 1;
  }
  list = list+'</ul>';
  return list;
}


// Home page route
router.get('/', function (req, res) {
  User.get_all_users((err, users) => {
    console.log("getting all users from test1");
    if (err){
      res.send(err);
      console.log('res', users);
    } else {
      var list = user_list_template(users);
      res.send(list);
    }
  });
});

// About page route
router.get('/about', function (req, res) {
  res.send('About this site');
});

module.exports = router;
