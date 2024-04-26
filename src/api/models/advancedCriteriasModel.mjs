import Post from './postModel.js'; 
import Criteria from './criteriaModel.mjs';
import Field from './fieldModel.mjs'; 

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; 


const AdvancedCriteria = sequelize.define('AdvancedCriteria', {
  advanced_criteriasID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  postID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  criteriaID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fieldID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'advanced_criterias',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

AdvancedCriteria.belongsTo(Post, { foreignKey: 'postID' });
AdvancedCriteria.belongsTo(Criteria, { foreignKey: 'criteriaID' });
AdvancedCriteria.belongsTo(Field, { foreignKey: 'fieldID' });

(async () => {
    try {
      await AdvancedCriteria.sync({ force: false });
      console.log('AdvancedCriteria model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default AdvancedCriteria;
