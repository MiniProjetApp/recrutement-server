import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs';
import User from './userModel.mjs'; 
import Languages from './languagesModel.mjs'; 

const UserLanguages = sequelize.define('UserLanguages', {
  user_languagesID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  languageID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  level: {
    type: DataTypes.ENUM('basic', 'intermediate', 'advanced'),
    allowNull: true,
  },
}, {
  tableName: 'user_languages',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

UserLanguages.belongsTo(User, { foreignKey: 'userID' });
UserLanguages.belongsTo(Languages, { foreignKey: 'languageID' });

(async () => {
    try {
      await UserLanguages.sync({ force: false });
      console.log('UserLanguages model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default UserLanguages;
