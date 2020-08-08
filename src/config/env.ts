const env = {
    database: 'agenda_node_db',
    username: 'root',
    password: 'javier_mysql',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    jwtSecret: '45G3ND4_N0D3J5'
  };
   
  export default env;