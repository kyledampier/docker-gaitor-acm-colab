FROM python:3.8

# Set environment variables and create a working directory
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Run the application
CMD ["python", "main.py"]
