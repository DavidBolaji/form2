const { createPool } = require("mysql2");

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_PROD_USER,
  password: process.env.MYSQL_PROD_PASS,
  database: process.env.MYSQL_PROD_DB,
  waitForConnections: false, // Whether the pool should wait for available connections
  connectionLimit: 10,      // Maximum number of connections in the pool
  queueLimit: 0 
});

// Promisify pool query method
// const query = promisify(pool.query).bind(pool);
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
