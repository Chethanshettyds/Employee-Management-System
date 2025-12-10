backend :

step 1: cd backend
step 2: start .venv variable          Ex : . .\.venv\Scripts\Activate.ps1
step 3: python manage.py runserver

frontend :

step 1: cd frontend
step 2: npm start    or   ng serve

Adding data :

Step 1: . .\.venv\Scripts\Activate.ps1
step 2: python manage.py createsuperuser
step 3: Username: admin
        Email address: admin@example.com
        Password: ********
        Password (again): ********
Step 4: python manage.py runserver