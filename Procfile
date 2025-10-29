release: python manage.py migrate && python manage.py collectstatic --noinput
web: gunicorn clue.wsgi:application --log-file - --bind 0.0.0.0:$PORT
