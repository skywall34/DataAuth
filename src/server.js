import mysql from 'mysql';

const envVars = [
  'MYSQL_DB_USER',
  'MYSQL_DB_PW',
];

function errMsgTag(strings, envExp) {
  return `Environment variable ${envExp} not defined.`
}

for (let envVar of envVars) {
  if (!process.env[envVar]) { throw new Error(errMsgTag`${envVar}`); }
}


export default mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_DB_USER,
  password : process.env.MYSQL_DB_PW,
  port     : 3306 || process.env.MYSQL_DB_PORT,
  database : 'dapp',
});
