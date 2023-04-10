const { Sequelize } = require('sequelize');

const {DB_DBNAME, DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_SSL} = process.env

let connection;

try {
  connection = new Sequelize(DB_DBNAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOSTNAME,
    dialect: 'mysql',
    ssl: DB_SSL ? true : false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    } 
  });  
} catch (error) {
  console.error(`NAO FOI POSSIVEL CONECTAR AO BANCO DE DADOS, MOTIVO -`)
  console.log(error)
}

module.exports = {connection}