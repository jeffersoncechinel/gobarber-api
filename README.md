# GoBarber API

This is the repository for the GoBarber API application.  
If you don't know what GoBarber is please have a look [here](https://github.com/jeffersoncechinel/gobarber).

Its purpose is to provide backend functionality for the [GoBarber Web](https://github.com/jeffersoncechinel/gobarber-web) and [GoBarber Mobile](https://github.com/jeffersoncechinel/gobarber-mobile) applications.

You may also want to see the [GoBarber Web repository](https://github.com/jeffersoncechinel/gobarber-web)
You may also want to see the [GoBarber Mobile repository](https://github.com/jeffersoncechinel/gobarber-mobile)

The application is written NodeJS + Express based on Typescript.

Implementations
----
- Rate limiter middleware.
- Exceptions handler.
- Caching provider supporting redis driver.
- Email provider supporting ethereal and AWS SES drivers.
- Template engine for custom email notifications layouts.
- Storage provider supporting local storage and AWS S3.
- TypeORM for database abstraction and migrations.

Requirements
----
* [NodeJS](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Redis](https://redis.io/)

Let's get started
----
```
* Important! You should have a database created manualy on your PostgreSQL then set it along with its credentials in ormconfig.json file.

# clone the repository
git clone https://github.com/jeffersoncechinel/gobarber-api.git

# access the repository folder
cd gobarber-api

# install the dependencies
yarn install

# set your environment variables in .env file
cp .env.example .env

# apply the database migrations
yarn typeorm:migrate

# init the server
yarn dev:server
```

The server may now be running at http://127.0.0.1:3333/


License
----

MIT
