const mysql = require("mysql")
const util = require("util")

const db = mysql.createConnection({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: false,
})

const query = util.promisify(db.query).bind(db)

module.exports = {
  query
}