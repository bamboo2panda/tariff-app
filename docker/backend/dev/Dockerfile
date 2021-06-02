FROM python:3.8-alpine
LABEL maintainer="bamboo2panda@gmail.com"

ENV PYTHONBUFFERED 1

COPY ./backend/requirements.txt ./backend/requirements.txt
RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r ./backend/requirements.txt
RUN apk del .tmp-build-deps
WORKDIR /backend
COPY ./backend /backend

RUN adduser -D user
USER user