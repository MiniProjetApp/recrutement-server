import User from './userModel.mjs'; 
import Field from './fieldModel.mjs';

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; // Assuming you have a file for database connection


const Education = sequelize.define('Education', {
  educationID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  institution: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  diploma_type: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  fieldID: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
}, {
  tableName: 'education',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});


Education.belongsTo(User, { foreignKey: 'userID' });
Education.belongsTo(Field, { foreignKey: 'fieldID' });

(async () => {
    try {
      await Education.sync({ force: false });
      console.log('Education model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default Education;
