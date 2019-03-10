let express = require('express');
let sql = require('../server');

//Create a constructor for each table

let User = (user) => {
  this.user_id = user.user_id;
  this.username = user.username;
  this.address = user.address;
  this.description = user.description;
};


// User Functions
User.get_all_users = (result) => {
  sql.query("SELECT * FROM test1", function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(null, err);
      }
      else{
        console.log('tasks : ', res);
        result(null, res);
      }
  });
};

module.exports= {User};
