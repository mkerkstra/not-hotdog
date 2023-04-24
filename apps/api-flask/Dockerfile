FROM python:3.11-slim-buster

# Set the working directory in the container
WORKDIR /flask

# Copy the requirements.txt file to the container
COPY apps/api-flask/requirements.txt .

# Install the required packages
RUN pip3 install -r requirements.txt

# Copy the source code to the container
COPY apps/api-flask .

# Expose port 5000 for the Flask app
EXPOSE 5000

USER flask
# Set the command to run the Flask app
CMD [ "python3", "-m", "flask", "run", "--host=0.0.0.0", "--debug"]
