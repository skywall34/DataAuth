let express = require('express');
let app = express();
let path = require('path');
let mysql = require('mysql');
let connection = require('./server.js');
let user_controller = require('./controller/user_controllers');

connection.connect(function(err) {
    if (err) throw err;
		else{
			console.log("MySQL Connection Successful!")
		}
});


app.use(user_controller);


const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
