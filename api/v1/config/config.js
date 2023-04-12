const utils = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.MONGODB_URI || "mongodb+srv://oyedeleholaji84:Wordwide@cluster0.p0ujvth.mongodb.net/?retryWrites=true&w=majority",
    sec_key: process.env.SEC_KEY || "768920isdjf",
    jwtSecret: 'secret',
};
export default utils;