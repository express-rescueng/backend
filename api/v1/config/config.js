// config.js
const utils = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.MYSQL_URI || "mysql://username:password@localhost:3306/database_name",
    sec_key: process.env.SEC_KEY || "768920isdjf",
    jwtSecret: 'secret',
};
export default utils;