import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs';

const Language = sequelize.define('Language', {
  languageID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'languages',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});


(async () => {
    try {
      await Language.sync({ force: false });
      console.log('Language model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();




export default Language;
