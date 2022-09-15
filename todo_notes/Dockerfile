# syntax=docker/dockerfile:1

FROM python:3.10.4-slim

# Install Postgres and Python
RUN apt-get update \
&& apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev

# Upgrade pip
RUN pip3 install --upgrade pip

# Copy project and install dependencies
COPY . .
RUN pip install -r requirements.txt

# Install Gunicorn for running Django in production environment
RUN pip install gunicorn
