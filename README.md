backend :

step 1: cd backend
step 2: start .venv variable          Ex : . .\.venv\Scripts\Activate.ps1
step 3: python manage.py runserver    or gunicorn employee_system.wsgi:application

Link : http://127.0.0.1:8000/

frontend :

step 1: cd frontend
step 2: npm start    or   ng serve
http://localhost:4200/