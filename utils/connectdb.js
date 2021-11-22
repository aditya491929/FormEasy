const mongoose = require('mongoose')
const dbUrl = process.env.DB_URL;

mongoose.connect (dbUrl, {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", ()=>{
    console.log("Database Connected!");
});