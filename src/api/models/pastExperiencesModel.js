import User from './userModel.js'; 
import Field from './fieldModel.js'; 
import Subfield from './subfieldModel.js'; 



import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; 


const PastExperience = sequelize.define('PastExperience', {
  experienceID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  workplace_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  time_spent: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  fieldID: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  subfieldID: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
}, {
  tableName: 'past_experiences',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

PastExperience.belongsTo(User, { foreignKey: 'userID' });
PastExperience.belongsTo(Field, { foreignKey: 'fieldID' });
PastExperience.belongsTo(Subfield, { foreignKey: 'subfieldID' });

(async () => {
    try {
      await PastExperience.sync({ force: false });
      console.log('User model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default PastExperience;
