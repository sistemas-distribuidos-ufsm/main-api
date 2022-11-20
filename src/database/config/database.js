/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  production: {
    dialect: 'postgres',
    dialectOptions: {
      ssl:
        process.env.DB_ENVIRONMENT === 'production'
          ? {
              require: true,
              rejectUnauthorized: false,
            }
          : false,
    },
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
