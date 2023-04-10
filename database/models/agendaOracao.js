const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require('../connection/connection');


const AgendaOracao = connection.define('AgendaOracao', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, 
    autoIncrement: true
  },
  dataHoraCriacao: {
    type: DataTypes.DATE,
    field: 'created_at'
    // allowNull defaults to true
  },
  hora: {
    type: DataTypes.SMALLINT
  },
 nomePessoa: {
    type: DataTypes.STRING, 
    field: 'nome_pessoa'
  }
  }, {
    sequelize: connection,
    tableName: 'agenda_oracao',
    freezeTableName : true,
    timestamps : false,
    name:{
        singular:'AgendaOracao',
        plural: 'AgendaOracao'
    },
    underscored : false
  // Other model options go here
});

module.exports = AgendaOracao


