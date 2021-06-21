#!/bin/sh

until cd /backend
do 
    echo "Wait for server volume..."
done

until ./manage.py migrate
do
    echo "Wait for db to be ready..."
    sleep 2
done

until ./manage.py collectstatic --noinput
do
    echo "Wait for static to be ready..."
    sleep 2
done

gunicorn app.wsgi --bind backend --workers 4 --threads 4