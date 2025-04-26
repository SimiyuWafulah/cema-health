```markdown
# Cema Health Information System API

A secure RESTful API for managing healthcare programs, medical professionals, and patient enrollment. Built with Node.js, Express, and Sequelize (SQLite).

## Features

- **Role-Based Access Control**
  - Sysadmins: Create/manage doctor profiles
  - Doctors: Manage patients and health programs
- **Patient Management**
  - Create/update patient records
  - Enroll patients in multiple health programs
- **Security**
  - JWT Authentication
  - Rate Limiting (1000 requests/15min)
  - Request Validation
  - SQL Injection Protection

## API Endpoints

| Endpoint                 | Method | Description                     | Access       |
|--------------------------|--------|---------------------------------|--------------|
| `/auth/login`            | POST   | Get JWT token                   | Public       |
| `/users`                 | POST   | Create new doctor (Sysadmin)    | Sysadmin     |
| `/patients`              | POST   | Create patient record           | Doctor       |
| `/patients`              | GET    | List patients                   | Doctor/Admin |
| `/programs`              | POST   | Create health program           | Doctor/Admin |
| `/programs`              | GET    | List available programs         | Authenticated|

## Getting Started

### 1. Prerequisites

- Node.js v18+
- SQLite3
- Postman/curl for API testing

### 2. Installation

```bash
git clone https://github.com/yourusername/health-system-api.git
cd health-system-api
npm install
cp .env.example .env
```

### 3. Configuration

Edit `.env` file:
```env
JWT_SECRET=your_secure_secret_here
DB_STORAGE=./database.sqlite
```

### 4. Running the Server
```bash
npm run dev
# API will be available at http://localhost:3000
```

## API Integration Guide

### Authentication Flow
1. **Sysadmin Login** (pre-created account)
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sysadmin@hospital.com","password":"SecurePass123"}'
```

2. **Create Doctor Account**
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer <sysadmin-token>" \
  -H "Content-Type: application/json" \
  -d '{"email":"newdoctor@hospital.com","password":"doctor123","role":"doctor"}'
```

3. **Doctor Login**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"newdoctor@hospital.com","password":"doctor123"}'
```

### Example Frontend Integration (React)
```javascript
// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add JWT to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const createPatient = (patientData) => api.post('/patients', patientData);
```

## Deployment

### Docker
```bash
docker-compose up --build
```

### Environment Variables
| Variable      | Description                | Default          |
|---------------|----------------------------|------------------|
| `JWT_SECRET`  | Authentication secret      | Required         |
| `DB_STORAGE`  | SQLite file path           | ./database.sqlite|
| `NODE_ENV`    | Environment mode           | development      |

## Security Considerations

1. **Production Readiness**
```bash
# Recommended .env for production
NODE_ENV=production
JWT_SECRET=complex_password_here
DB_STORAGE=/secure-path/database.sqlite
```

2. **HTTPS Setup**
- Use Nginx reverse proxy
- Obtain SSL certificate (Let's Encrypt)

3. **Rate Limiting**
- Configured: 1000 requests/15 minutes per IP
- Adjust in `server.js`:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 // Tighter limits for production
});
```

## API Documentation

Access interactive documentation at:
`http://localhost:3000/api-docs`


## Error Handling

Sample Error Response:
```json
{
  "status": "error",
  "message": "Patient not found",
  "code": 404,
  "timestamp": "2024-02-20T12:34:56.789Z"
}
```

## License

MIT License - See [LICENSE](LICENSE) for details

---

**Note for Frontend Developers**: This API follows RESTful standards and can be integrated with any frontend framework. See complete endpoint documentation in the [API Reference](#api-documentation) section.
```

