import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import specs from './config/swagger.js';
import logger from './utils/logger.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import patientRouter from './routes/patient.routes.js';
import programRouter from './routes/program.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Loading env variables
dotenv.config();

// 
const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// Body Parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Request Logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/programs', programRouter);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Error Handling (Must be last middleware)
app.use(errorHandler);

// Database Synchronization and connection
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    logger.info('Database connection established and models synchronized');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Server Initialization
const PORT = process.env.PORT;
const startServer = async () => {
  await syncDatabase();
  app.listen(PORT, () => {
    logger.info('Server is running');
    logger.info(`API Documentation: http://localhost:${PORT}/api-docs`);
  });
};

// Starting  the server
startServer().catch(error => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});

export default app;