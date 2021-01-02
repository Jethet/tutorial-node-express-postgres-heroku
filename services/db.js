const pg = require("pg");
require("dotenv").config();

const config = {
  user: process.env.PGUSER,
  database: "schools_register",
  password: process.env.PGPASSWORD,
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("Connected to the database");
});

const createTables = () => {
  const schoolTable = `CREATE TABLE IF NOT EXISTS
  students(
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(128) NOT null,
    student_age INT NOT NULL,
    student_class VARCHAR(128) NOT null,
    parent_contact VARCHAR(128) NOT null,
    admission_date VARCHAR(128) NOT null,
)`;

  pool
    .query(schoolTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on("remove", () => {
  console.log("Client removed");
  process.exit(0)
})

// export pool and createTables, to be accessible anywhere in the app
module.exports = {
  createTables,
  pool,
}

require("make-runnable")