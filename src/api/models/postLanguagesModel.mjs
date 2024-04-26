import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs';
import Languages from './languagesModel.mjs';
import Post from "./postModel.mjs"

const PostLanguages = sequelize.define('PostLanguages', {
  post_languagesID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  languageID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  level: {
    type: DataTypes.ENUM('basic', 'intermediate', 'advanced'),
    allowNull: true,
  },
  postID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'post_languages',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});
(async () => {
  try {
    await PostLanguages.sync({ force: false });
    console.log('PostLanguages model synced with database');
  } catch (error) {
    console.error('Error syncing User model:', error);
  }
})();
PostLanguages.belongsTo(Languages, { foreignKey: 'languageID' });

export default PostLanguages;
