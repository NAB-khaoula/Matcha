const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test_erp",
  password: "admin123",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users;", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [id],
    (_, result) => {
      if (!result.rows.length) response.status(404).send(`{"error": "no user has been found with this id"}`);
      else response.status(200).json(result.rows);
    }
  );
};

const postUser = (request, response) => {
  const user = request.body;
  console.log('body', user);
  pool.query(
    "INSERT INTO users(username, email, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [user.username, user.email, user.password, user.firstname, user.lastname],
    (error, result) => {
      if (error) response.status(500).send(`{error: duplicated username}`);
      else response.status(201).send(`{"user":" ${result.rows[0].user_id}"}`);

    }
  );
};

module.exports = { getUsers, getUserById, postUser};
