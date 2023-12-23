import connectDB from "../config/dbConnect.js";

export const getUsers = (req, res) => {
  const connection = connectDB();
  const sql = "SELECT * FROM users";
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ results: results.length, data: results });
    connection.end();
  });
};

export const createUser = (req, res) => {
  const connection = connectDB();
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  connection.query(sql, [name, email], (err, result) => {
    if (err) {
      connection.end();
      res.json({ msg: err.message });
    }
    connection.end();
    res.json({ id: result.insertId, name, email });
  });
};

export const getOneUser = (req, res) => {
  const connection = connectDB();
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      connection.end();
      throw err;
    }
    if (result.length > 0) {
      res.json(result[0]);
      connection.end();
    } else {
      connection.end();
      res.status(404).json({ message: "User not found" });
    }
  });
};

export const updateUser = (req, res) => {
  const connection = connectDB();
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  connection.query(sql, [name, email, id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.json({ id, name, email });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};

export const deleteUser = (req, res) => {
  const connection = connectDB();
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};
