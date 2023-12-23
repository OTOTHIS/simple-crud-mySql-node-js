import mysql from "mysql2";

const connectDB = () => {
  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD, //process.env.PASSWORD
    database: process.env.DB,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL: " + err.stack);
      return;
    }
    console.log("Connected to MySQL");
  });

  return connection;
};

export default connectDB;
