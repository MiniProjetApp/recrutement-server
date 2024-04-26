import User from './userModel.mjs'; 
import Field from './fieldModel.mjs'; 
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; 


const EnterpriseProfile = sequelize.define('EnterpriseProfile', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fieldID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  headquarter_state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'enterprise_profile',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});


EnterpriseProfile.belongsTo(User, { foreignKey: 'userID' });
EnterpriseProfile.belongsTo(Field, { foreignKey: 'fieldID' });

(async () => {
    try {
      await EnterpriseProfile.sync({ force: false });
      console.log('EnterpriseProfile model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default EnterpriseProfile;
