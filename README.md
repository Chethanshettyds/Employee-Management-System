backend :

step 1: cd backend
step 2: start .venv variable          Ex : . .\.venv\Scripts\Activate.ps1
Step 3: Install django          Ex: "python -m pip install django"
Step 4 : Install Django Framework        Ex: "python -m pip install djangorestframework"
step 5: python manage.py runserver    or gunicorn employee_system.wsgi:application

Link : http://127.0.0.1:8000/

frontend :

step 1: cd frontend
Step 2: npm install --legacy-peer-deps
step 3: npm start    or   ng serve     or npx ng serve
http://localhost:4200/







Employee Management System – Full Stack Web Application
A full‑stack Employee Management System built with Angular, Django, and PostgreSQL. The application provides secure authentication, role‑based access, employee profile management, and dashboard analytics for HR and admin workflows.

🚀 Features
Authentication & Authorization

JWT‑based login and logout using Django REST Framework Simple JWT

Role‑based access control for admin and standard users
​

Employee Management

Create, view, update, and delete employee records

Store profile details such as role, department, contact info, and joining date

Profile image upload via Django ImageField with Pillow
​

Dashboard & Analytics

Angular dashboard with charts and stats (total employees, department‑wise counts, etc.)

Filter and search employees using django-filter and REST API query parameters
​

Secure API Backend

RESTful JSON API built with Django REST Framework

CORS support for the Angular frontend using django-cors-headers
​

Responsive UI

Angular 17 frontend with a modern, responsive UI suitable for desktop use
​

🛠️ Tech Stack
Backend
Python 3

Django (Web framework)
​

Django REST Framework (API layer)
​

PostgreSQL with psycopg driver

Simple JWT (djangorestframework-simplejwt) for authentication
​

django-cors-headers for CORS
​

django-filter for filtering
​

Pillow for image handling
​

Frontend
Angular 17

TypeScript

Angular CLI for build and dev tooling
​

HTTPClient for API communication

SCSS/CSS for styling

📋 Prerequisites
Before you begin, ensure you have the following installed locally:

Python 3.12+ with pip
​

Node.js (LTS, v18+ recommended) and npm
​

PostgreSQL server (if using the Postgres configuration)

Git (optional, for cloning)

PowerShell on Windows (for activating the virtual environment)