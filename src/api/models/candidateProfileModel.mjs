import User from './userModel.mjs'; 
import Field from './fieldModel.mjs';
import Subfield from './subFIeldModel.mjs'

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; 

const CandidateProfile = sequelize.define('CandidateProfile', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  biography: {
    type: DataTypes.TEXT,
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
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  picture: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true,
  },
  fb_link: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  linkedin_link: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  twitter_link: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  wilaya: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'candidate_profile',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

CandidateProfile.belongsTo(User, { foreignKey: 'userID' });
CandidateProfile.belongsTo(Field, { foreignKey: 'fieldID' });
CandidateProfile.belongsTo(Subfield, { foreignKey: 'subfieldID' });

(async () => {
    try {
      await CandidateProfile.sync({ force: false });
      console.log('User model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default CandidateProfile;
