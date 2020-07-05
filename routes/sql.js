var mysql = require('mysql')
var sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'mydb'
})

sql.connect()

module.exports = sql