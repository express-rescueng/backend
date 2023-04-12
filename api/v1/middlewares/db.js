import mongoose from 'mongoose';
import utils from '../config/config.js';

const uri = utils.dbUrl;

// Replace <username>, <password>, and <dbname> with your values
// const uri = 'mongodb+srv://<username>:<password>@<dbname>.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error(err));

const db = mongoose.connection;
db.once("open", () => {
    console.log("MongoDB connection ready!");
});
export default db;