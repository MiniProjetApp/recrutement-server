import Sequelize from 'sequelize';
import databaseConfig from './dbConfig.mjs';

const sequelize = new Sequelize(databaseConfig.development);

export default sequelize;