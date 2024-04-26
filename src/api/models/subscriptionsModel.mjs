import User from './userModel.mjs'; 
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; 

const Subscription = sequelize.define('Subscription', {
  subID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  subscriptionID: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  starting_date: {
    type: DataTypes.DATEONLY,
    allowNull: false, 
  },
  ending_date: {
    type: DataTypes.DATEONLY,
    allowNull: false, 
  },
}, {
  tableName: 'subscriptions',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

Subscription.belongsTo(User, { foreignKey: 'userID' });


(async () => {
    try {
      await Subscription.sync({ force: false });
      console.log('Subscription model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default Subscription;
