import { Sequelize } from 'sequelize';
import  env from '../config/env';

const sequelize = new Sequelize(
    env.database,
    env.username,
    env.password,
    {
        host: env.host,
        dialect: 'mysql'
    }
); 

export default sequelize;