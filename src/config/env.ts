const env = {
    database: 'node_prueba',
    username: 'node',
    password: 'node123',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
   
  export default env;