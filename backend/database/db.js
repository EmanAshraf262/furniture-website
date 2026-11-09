// const mysql = require('mysql2');
import mysql from 'mysql2';




const db = mysql.createPool({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "corvit",



     host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,



});

// testing Connection
db.getConnection((err, con) => {
    if (err) {
        console.log("DB not connected!!");
    } else {
        console.log("Connection Success!!");
    }
    con.release();


});

// module ki type ma react wla kam hu ga matlb ka import wala kam or common.js ma require wala kam hu ga 
// module.exports=db;
export default db;           