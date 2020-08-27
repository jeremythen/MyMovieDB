# MyMovieDB

Install dependencies:

> npm install

Before running the project, make sure Redis server is running.

Run this project with typescript:

> npm start

Build the typescript project and run the js build files:

> npm run prod


Run the sequelize migrations:

> npx sequelize-cli db:migrate

Fill the database with data:

> npx sequelize-cli db:seed:all


## Swagger visualization

When the app is running, visit the endpoint /swagger to see the app api docs.

![alt text](mymoviedb-swagger-doc.jpg "MyMovieDB Swagger preview")

## Testing

Make sure the NODE_ENV is set to test

Sequelize will call the build/ js files for the configuration, so make sure the run:

> npx tsc

Run:

> npm run test

Based on the package.json file, this will create the test database in case it doesn't exist, remove any migrations, then add the migrations and fill it with seeds (about 20 records for each model.). The number of seeds can be changed in the .env file.

## Postman visualization and testing

There is a postman collection and environment files in API docs folder. Import them to postman to test the API from there

![alt text](mymoviedb-postman.jpg "MyMovieDB Swagger preview")


## Docker

> docker build -t mymoviedb .
> docker-compose up

Then docker will run the following commands:

> npm install

> export NODE_ENV=docker

> npx tsc

> npx sequelize-cli db:migrate:undo:all

> npx sequelize-cli db:migrate

> npx sequelize-cli db:seed:all

> npm start

You may change the docker mysql exposed port to avoid collision with any other instance already running.