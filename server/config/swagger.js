// src/config/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CEMA Health Information System API',
      version: '1.0.0',
      description: 'Documentation for CEMA Health System API - Manage patients, programs, and medical staff',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development Server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        // Common Schemas
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'Error description' },
            code: { type: 'integer', example: 400 }
          }
        },

        // Authentication
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'doctor@hospital.com' },
            password: { type: 'string', format: 'password', example: 'SecurePass123' }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1 },
                email: { type: 'string', example: 'doctor@hospital.com' },
                role: { type: 'string', example: 'doctor' }
              }
            }
          }
        },

        // User Schemas
        UserCreateRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'newdoctor@hospital.com' },
            password: { type: 'string', format: 'password', example: 'DoctorPass123' },
            role: { type: 'string', enum: ['doctor'], example: 'doctor' }
          }
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            email: { type: 'string', example: 'doctor@hospital.com' },
            role: { type: 'string', example: 'doctor' },
            status: { type: 'string', example: 'active' }
          }
        },

        // Patient Schemas
        PatientCreateRequest: {
          type: 'object',
          required: ['name', 'contact'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            contact: { type: 'string', example: '+1234567890' },
            programIds: {
              type: 'array',
              items: { type: 'integer', example: 1 }
            }
          }
        },
        PatientResponse: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            contact: { type: 'string', example: '+1234567890' },
            programs: {
              type: 'array',
              items: { $ref: '#/components/schemas/ProgramResponse' }
            }
          }
        },

        // Program Schemas
        ProgramCreateRequest: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Malaria' }
          }
        },
        ProgramResponse: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Malaria' },
            createdBy: { type: 'integer', example: 1 }
          }
        }
      }
    },
    tags: [
      { name: 'Authentication', description: 'User login operations' },
      { name: 'Users', description: 'System user management' },
      { name: 'Patients', description: 'Patient records management' },
      { name: 'Programs', description: 'Health program management' }
    ]
  },
  apis: [
    './server/routes/*.routes.js',
    './server/models/*.model.js'
  ]
};

const specs = swaggerJsdoc(options);



export default specs;