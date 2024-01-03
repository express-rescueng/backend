// config.js
const utils = {
    port: process.env.PORT || 3000,
    mysql: {
        username: process.env.MYSQL_USERNAME || "root",
        password: process.env.MYSQL_PASSWORD || "Sunepa1234",
        database: process.env.MYSQL_DATABASE || "backend",
        host: process.env.MYSQL_HOST || "localhost",
        dialect: "mysql",
    },
    sec_key: process.env.SEC_KEY || "768920isdjf",
    jwtSecret: 'secret',
};

utils.dbUrl = process.env.MYSQL_CONNECTION_STRING || `mysql://${utils.mysql.username}:${utils.mysql.password}@${utils.mysql.host}:${utils.mysql.port}/${utils.mysql.database}`;

module.exports = utils;
