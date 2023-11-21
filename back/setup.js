const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "12345",
  port: 5432,
});
const DB_DATABASE = "matchadb";

async function setupDatabase() {
  const res = await pool.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_DATABASE}'`
    );
  if (res.rowCount === 0) {
    console.log(`${DB_DATABASE} database not found, creating it.`);
    await pool.query(`CREATE DATABASE "${DB_DATABASE}";`);
    console.log(`created database ${DB_DATABASE}.`);
    //ANCHOR Create User TABLE
  } else {
    console.log(`The ${DB_DATABASE} database exists already!`);
  }
 
  await pool.end();
}

module.exports = setupDatabase;
