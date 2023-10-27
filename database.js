const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
    user: 'test', // Nombre de usuario de PostgreSQL
    host: 'localhost', // Host de la base de datos
    database: 'Users', // Nombre de la base de datos
    password: 'test', // Contraseña de PostgreSQL
    port: 5432, // Puerto de PostgreSQL (por defecto es 5432)
  });

module.exports = pool;