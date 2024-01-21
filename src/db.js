require('dotenv').config();
const db = require('mongoose');
const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
  } = process.env;

// main().catch(error => console.log("Failed to connect to database", error))

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.pw1udzi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const conn = () => {
    db.connect(url, connectionParams)
    .then(  () => {
        console.log("Connected to database")
    })
    .catch((error) => {
        console.log("Failed to connect to database", error)
    })
}


module.exports = {
    conn
}