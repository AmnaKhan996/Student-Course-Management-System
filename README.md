# Student Course Management System

A full-stack **Student Course Management System** where students can browse courses, enroll/unenroll in courses, and administrators can manage courses.

The system implements **JWT Authentication** and **Role-Based Authorization** to provide secure access control.

Admin and student portals are completely separated:

- Admin users cannot access the student portal.
- Student users cannot access the admin portal.

---

# Features

## Authentication & Authorization

- JWT-based authentication.
- Secure login system.
- Role-based access control.
- Protected frontend routes.
- Protected backend APIs.
- Unauthorized users cannot access restricted resources.

---

# User Roles

## Admin

Admin can:

- Login into admin dashboard.
- Create new courses.
- Update existing courses.
- Delete courses.
- View all courses with pagination.


## Student

Students can:

- Create an account.
- Login into student dashboard.
- View available courses.
- Enroll in courses.
- Unenroll from courses.
- Manage enrolled courses.

---

# Technology Stack

## Backend

- FastAPI
- SQLAlchemy ORM
- MySQL Database
- JWT Authentication
- Pydantic
- Uvicorn
- Python


## Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- Axios
- React Router
- React Hot Toast


---
# Backend Setup

Follow these steps to run the backend.

## 1. Navigate to Backend Folder

Open terminal and move into backend directory:

```bash
cd backend
```

---

## 2. Create Virtual Environment

Create Python virtual environment:

```bash
python -m venv venv
```

---

## 3. Activate Virtual Environment

### Windows:

```bash
venv\Scripts\activate
```

### Linux / Mac:

```bash
source venv/bin/activate
```

After activation you should see:

```
(venv)
```

---

## 4. Install Backend Dependencies

Install all required packages:

```bash
pip install -r requirements.txt
```

---

## 5. Configure Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
DATABASE_URL=mysql+pymysql://username:password@localhost/database_name

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Update database credentials according to your MySQL setup.

---

## 6. Run Backend Server

Start FastAPI server:

```bash
uvicorn main:app --reload
```

Backend will run on:

```
http://localhost:8000
```

Swagger API documentation:

```
http://localhost:8000/docs
```

---

# Frontend Setup

Follow these steps to run the frontend.

## 1. Navigate to Frontend Folder

Open another terminal:

```bash
cd frontend
```

---
 
## 2. Create Vite React Application Install Frontend Dependencies

create a vite React project inside the frontend folder
 
 ```bash
 npm create vite@latest.

 ```
 select a framework:
 >React
 select a variant:
 >JavaScript



Install npm packages:

```bash
npm install
```

---

## 3. Setup Tailwind CSS

Install Tailwind CSS with Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite
```

Configure Tailwind in Vite
Open:
vite.config.js
Update the file:

```bash
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({

  plugins: [
    react(),
    tailwindcss()
  ],

})

```

Configure Global CSS
Open:
src/index.css
Remove the default CSS and add:

```bash
@import "tailwindcss";
``


## 4. Run Frontend Application

Start Vite development server:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# Running Complete Application

Run backend and frontend in separate terminals.

---

## Terminal 1 - Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Terminal 2 - Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Default Admin Account

Use these credentials to access the admin dashboard:

```
Email:
amna@gmail.com

Password:
12345678
```

---

