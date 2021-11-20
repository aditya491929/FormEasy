const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
const app = express();
const PORT = process.env.PORT || 8080;
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

app.use(morgan('tiny'));
app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send('HOME');
})

app.get('*', (req,res) => {
    res.send('Error 404!');
})

app.listen(PORT, () => {
    console.log(`Serving on PORT ${PORT}`);
})