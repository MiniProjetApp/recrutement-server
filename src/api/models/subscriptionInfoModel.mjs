import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; 

const SubscriptionInfo = sequelize.define('SubscriptionInfo', {
  subinfoID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  tableName: 'subscription_info',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

(async () => {
    try {
      await SubscriptionInfo.sync({ force: false });
      console.log('SubscriptionInfo model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default SubscriptionInfo;
