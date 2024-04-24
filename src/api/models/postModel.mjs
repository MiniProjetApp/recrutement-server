import User from './userModel.mjs'; 
import Field from './fieldModel.mjs'; 
import Subfield from './subFieldModel.mjs'; 

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs';

const Post = sequelize.define('Post', {
  postID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING(255),
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
  driving_license_required: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  experience_required: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  age_min: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  age_max: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  study_level: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'post',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});


Post.belongsTo(User, { foreignKey: 'userID' });
Post.belongsTo(Field, { foreignKey: 'fieldID' });
Post.belongsTo(Subfield, { foreignKey: 'subfieldID' });

(async () => {
  try {
    await Post.sync({ force: false });
    console.log('User model synced with database');
  } catch (error) {
    console.error('Error syncing User model:', error);
  }
})();

export default Post;
