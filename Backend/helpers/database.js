const mysql = require('mysql2')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ayrestest"
});
db.connect((err) => {
    if (err) {
        console.log('Error connecting to DB:', err);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = db;
