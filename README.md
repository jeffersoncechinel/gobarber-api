# GoBarber API

<p align="center">
  <img src="https://github.com/jeffersoncechinel/gobarber-web/blob/master/resources/logo.svg" alt="logo" />
</p>

This is the repository for the GoBarber API application. If you don't know what GoBarber is please have a look [here](https://github.com/jeffersoncechinel/gobarber).

The purpose of this project is to provide backend functionality for the Desktop and Mobile applications.

You may also want to see the [GoBarber Web repository](https://github.com/jeffersoncechinel/gobarber-web)
You may also want to see the [GoBarber Mobile repository](https://github.com/jeffersoncechinel/gobarber-mobile)

The application is written in Typescript + NodeJS + Express.

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
* [MongoDB](https://www.mongodb.com/)
* [Redis](https://redis.io/)

Let's get started
----
:exclamation: You should have a database created manually on your PostgreSQL then set it along with its credentials in ormconfig.json file.

```

# clone the repository
git clone https://github.com/jeffersoncechinel/gobarber-api.git

# access the repository folder
cd gobarber-api

# install the dependencies
yarn install

# set your environment variables in .env file
cp .env.example .env

# set database credentials in ormconfig.json
cp ormconfig.json.example ormconfig.json

# apply the database migrations
yarn typeorm:migrate

# init the server
yarn dev:server
```

The server may now be running at http://127.0.0.1:3333/


License
----

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
