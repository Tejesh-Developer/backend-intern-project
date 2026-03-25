# Backend Intern Project

A Scalable REST API with Authentication & Role-Based Access Control (RBAC), built with FastAPI, SQLite, and a simple HTML/CSS/JS frontend.

## Tech Stack

- **Backend:** Python, FastAPI
- **Database:** SQLite (via SQLAlchemy ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt (via passlib)
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **API Docs:** Swagger UI (auto-generated)

## Project Structure
```
backend-intern-project/
├── backend/
│   ├── main.py          # App entry point
│   ├── database.py      # DB connection & session
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── auth.py          # JWT & password hashing
│   └── routers/
│       ├── users.py     # User APIs
│       └── tasks.py     # Task APIs
└── frontend/
    ├── index.html       # Login & Register page
    ├── dashboard.html   # Task dashboard
    ├── style.css        # Styling
    └── app.js           # API calls
```

## Getting Started

### 1. Clone the repository
```
git clone https://github.com/Tejesh-Developer/backend-intern-project.git
cd backend-intern-project
```

### 2. Setup Backend
```
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy python-jose passlib bcrypt python-multipart
```

### 3. Run Backend Server
```
uvicorn main:app --reload
```
Server runs at: http://127.0.0.1:8000

### 4. Run Frontend
```
cd frontend
python -m http.server 3000
```
Frontend runs at: http://localhost:3000

## API Endpoints (v1)

### Auth
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/v1/users/register | Register new user | No |
| POST | /api/v1/users/login | Login & get JWT token | No |
| GET | /api/v1/users/me | Get current user info | Yes |
| GET | /api/v1/users/all | Get all users (Admin only) | Admin |

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/v1/tasks/ | Create new task | Yes |
| GET | /api/v1/tasks/ | Get all tasks | Yes |
| PUT | /api/v1/tasks/{id} | Update task | Yes |
| DELETE | /api/v1/tasks/{id} | Delete task | Yes |

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control (user vs admin)
- Input validation with Pydantic
- CORS enabled for frontend access

## Scalability Notes

- **Modular structure:** Routers separated by feature for easy scaling
- **ORM based:** Switch from SQLite to PostgreSQL/MySQL with one line change
- **API Versioning:** All endpoints under /api/v1 for backward compatibility
- **Stateless Auth:** JWT tokens allow horizontal scaling
- **Future scope:** Can add Redis caching, Docker deployment, microservices architecture, load balancing with Nginx

## API Documentation

Swagger UI available at: http://127.0.0.1:8000/docs

## How to Test

1. Open http://localhost:3000
2. Register a new user
3. Login with credentials
4. Add, complete, and delete tasks
5. Test APIs directly at http://127.0.0.1:8000/docs

## Admin Crediantials

1. Gmail: admin@gmail.com
2. password: admin123
