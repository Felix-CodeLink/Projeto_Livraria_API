const mongoose = require('mongoose');
require('dotenv').config();

const {MONGO_URI} = process.env

class DatabaseConnection {
  static _connection = null;

  static get connection() {
    if (!this._connection) {
      throw new Error('Não existe essa conexão');
    }
    return this._connection;
  }

  static async connect() {
    if (!this._connection) {
      try {
        this._connection = await mongoose.connect(MONGO_URI);
        console.log('Banco de dados conectado');
      } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message);
        throw error;
      }
    }
  }

  static async destroy() {
    if (!this._connection) {
      throw new Error('Base de dados não inicializada');
    }
    await mongoose.disconnect();
    this._connection = null;
    console.log('Banco de dados desconectado');
  }
}

module.exports = {DatabaseConnection};
