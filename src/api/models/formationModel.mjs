import Field from './fieldModel.mjs'; 
import User from './userModel.mjs'; 

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; 

const Formation = sequelize.define('Formation', {
  formationID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  institu: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fieldID: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
}, {
  tableName: 'formations',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

Formation.belongsTo(Field, { foreignKey: 'fieldID' });
Formation.belongsTo(User, { foreignKey: 'userID' });

(async () => {
    try {
      await Formation.sync({ force: false });
      console.log('User model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default Formation;
