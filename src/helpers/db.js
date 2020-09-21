const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_value'
})

connection.connect((err)=>{
    if(err)console.log(err)
    console.log('DataBase Connected')
})

module.exports = connection