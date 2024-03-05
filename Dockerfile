FROM python:3.9

LABEL authors="pratik"

EXPOSE 80/tcp

COPY backend/requirements.txt /

RUN pip install --upgrade pip

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY backend/ backend/

ENTRYPOINT ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "80"]