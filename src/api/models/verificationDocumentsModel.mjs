import User from './userModel.mjs'; 
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; 

const VerificationDocument = sequelize.define('VerificationDocument', {
  resourceID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  resource_link: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'verification_documents',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

VerificationDocument.belongsTo(User, { foreignKey: 'userID' });

(async () => {
    try {
      await VerificationDocument.sync({ force: false });
      console.log('User model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default VerificationDocument;
