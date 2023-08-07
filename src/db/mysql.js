const { createPool } = require("mysql2");

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_PROD_USER,
  password: process.env.MYSQL_PROD_PASS,
  database: process.env.MYSQL_PROD_DB,
  connectionLimit: 10,
});
// Attempt to get a connection from the pool to check if it's established
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connection to the database established!");
  connection.release();
});

module.exports = pool.promise();
