var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    //password : 'skywall34', //memsql container fails when setting passwords for some reason
    port     : 3306,
    database : 'dapp'
});


module.exports = connection;
