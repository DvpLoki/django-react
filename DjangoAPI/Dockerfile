FROM python:3

WORKDIR /usr/src/djangoapi

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "manage.py" ,"runserver","8000"]