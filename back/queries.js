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
    (error, result) => {
      if (error) throw error;
      response.status(200).json(result.rows);
    }
  );
};

const postUser = (request, response) => {
  const user = request.body;
  pool.query(
    "INSERT INTO users(username, email, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5)",
    [user.username, user.email, user.password, user.firstname, user.lastname],
    (error, result) => {
      if (error) throw error;
      response.status(201).send(`User added with ID`);
    }
  );
};

module.exports = { getUsers, getUserById, postUser };
