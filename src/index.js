import express from 'express';
import path from 'path';
import mysql from 'mysql';
import connection from './server.js';
import User from './controllers/user_controllers';
import Ether from './controllers/ether_controllers';
import EtherTest from './controllers/ether_test';

connection.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connection Successful!");
});

let app = express();

app.use('/user', User);
app.use('/ether', Ether);
app.use('/ether_test', EtherTest);


const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
