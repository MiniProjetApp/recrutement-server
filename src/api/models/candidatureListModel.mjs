import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs';
import User from './userModel.mjs'; 
import Post from './postModel.mjs'; 

const CandidatureList = sequelize.define('CandidatureList', {
  candidatureID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  postID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'candidature_list',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

CandidatureList.belongsTo(User, { foreignKey: 'userID' });
CandidatureList.belongsTo(Post, { foreignKey: 'postID' });

(async () => {
    try {
      await CandidatureList.sync({ force: false });
      console.log('User model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default CandidatureList;
