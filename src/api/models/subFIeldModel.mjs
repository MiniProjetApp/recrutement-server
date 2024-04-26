import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs'; 
import Field from './fieldModel.mjs'; 

const Subfield = sequelize.define('Subfield', {
  subfieldID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  fieldID: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'subfield',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

Subfield.belongsTo(Field, { foreignKey: 'fieldID', onDelete: 'CASCADE' }); 

(async () => {
    try {
      await Subfield.sync({ force: false });
      console.log('Subfield model synced with database');
    } catch (error) {
      console.error('Error syncing User model:', error);
    }
  })();

export default Subfield;
