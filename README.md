🐳 Running with Docker
To create and run the Docker image:
Open Docker Desktop and make sure it’s running.
Open your terminal and navigate to your project folder:
cd todo-app

Build the Docker image:
docker build -t nestjs-todo .
nestjs-todo is a custom image name — you can change it if you like.

Run the Docker container:
docker run -p 3000:3000 nestjs-todo

Test the API using Postman:
Open Postman
Make requests to: http://localhost:3000/todos

📫 Postman Collection
The Postman collection file will be provided separately.

Once received:
Import it into Postman via File → Import

Use the predefined endpoints to test API