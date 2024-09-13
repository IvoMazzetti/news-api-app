# My Project

## Introduction

Welcome to the My Project documentation. This project is built with **Laravel** for the backend and **React** for the frontend, and it utilizes **Docker** for containerization. Follow these instructions to set up and run the application locally.

## Prerequisites

Before getting started, ensure you have the following tools installed:

<ul>
  <li><strong>Docker</strong>: <a href="https://www.docker.com/get-started" target="_blank">Download and install Docker</a></li>
  <li><strong>Docker Compose</strong>: Included with Docker Desktop, or <a href="https://docs.docker.com/compose/install/" target="_blank">install separately</a></li>
  <li><strong>Node.js and npm</strong>: <a href="https://nodejs.org/" target="_blank">Download and install Node.js</a></li>
</ul>

## Project Setup

### 1. Clone the Repository

Start by cloning the repository to your local machine:

<p>
<pre>
git clone &lt;repository-url&gt;
cd my-project
</pre>
</p>

### 2. Install PHP Dependencies

Before starting the Docker containers, install the PHP dependencies using Composer:

<p>
<pre>
composer install
</pre>
</p>

### 3. Build Docker Images and Start Containers

Build the Docker images and start the containers using Sail or Docker Compose:

<p>
<pre>
vendor/bin/sail up --build -d
</pre>
</p>

or

<p>
<pre>
docker-compose up --build -d
</pre>
</p>

Both commands will build the Docker images and run the containers in detached mode. Use Sail if you have it set up for your Laravel project.

### 4. Run Artisan Commands

Once the containers are up, you need to run Artisan commands inside the Docker container for Laravel. Use Sail or Docker Compose for these commands:

<p>
<pre>
vendor/bin/sail php artisan migrate
vendor/bin/sail php artisan schedule:work
</pre>
</p>

or

<p>
<pre>
docker-compose exec app php artisan migrate
docker-compose exec app php artisan schedule:work
</pre>
</p>

- `php artisan migrate` applies the database migrations.
- `php artisan schedule:work` starts the Laravel scheduler.

### 5. Build and Run the Frontend

Build and run the React application:

<p>
<pre>
npm run dev
</pre>
</p>

This command starts the development server for the React application.

## Troubleshooting

<ul>
  <li><strong>Database Connection Issues</strong>: Ensure that the <code>DB_HOST</code> in your <code>.env</code> file matches the database service name in <code>docker-compose.yml</code>.</li>
  <li><strong>Permission Errors</strong>: Make sure that your local user has the necessary permissions to execute Docker commands.</li>
</ul>

## License

This project is licensed under the MIT License. See the <a href="LICENSE" target="_blank">LICENSE</a> file for details.
