import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; 

const Criteria = sequelize.define('Criteria', {
  criteriaID: {
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
  tableName: 'criterias',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

(async () => {
    try {
      await Criteria.sync({ force: false });
      console.log('User model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default Criteria;
