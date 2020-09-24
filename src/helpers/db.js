require('dotenv').config()
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

connection.connect((err)=>{
    if(err)console.log(err)
    const a = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'db_value'
    }
    console.log('DataBase Connected')
})

module.exports = connection