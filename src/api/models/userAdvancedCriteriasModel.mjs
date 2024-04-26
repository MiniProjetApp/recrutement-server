// userAdvancedCriterias.model.js

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; 
import User from './userModel.mjs';
import Criteria from './criteriaModel.mjs'; 

class UserAdvancedCriterias extends Model {}

UserAdvancedCriterias.init({
  user_advanced_criteriasID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userID'
    }
  },
  criteriaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Criteria,
      key: 'criteriaID'
    }
  }
}, {
  sequelize,
  modelName: 'UserAdvancedCriterias',
  tableName: 'user_advanced_criterias',
  timestamps: false // If you don't have timestamp fields in your table
});

(async () => {
    try {
      await UserAdvancedCriterias.sync({ force: false });
      console.log('UserAdvancedCriterias model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default UserAdvancedCriterias;
