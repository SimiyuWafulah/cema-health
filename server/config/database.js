import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database configuration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
});

// Test database connection
export const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Sync database models
 export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized');
  } catch (error) {
    console.error('Database synchronization failed:', error);
    process.exit(1);
  }
};

export default sequelize
