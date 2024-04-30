import {DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs';

const User = sequelize.define('user', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('candidate', 'enterprise', 'admin'),
    allowNull: false
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {

  tableName: 'user',

  timestamps: false
});

(async () => {
  try {
    await User.sync({ force: false });
    console.log('User model synced with database');
  } catch (error) {
    console.error('Error syncing User model:', error);
  }
})();

export default User;
