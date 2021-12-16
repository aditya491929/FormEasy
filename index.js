const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
require('./utils/connectdb');


const userRouter = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    optionsSuccessStatus:200,
}));
app.use(passport.initialize());

app.use('/users', userRouter);

app.get('/', (req,res) => {
    res.send('HOME');
})

app.get('*', (req,res) => {
    res.send('Error 404!');
})

app.listen(PORT, () => {
    console.log(`Serving on PORT ${PORT}`);
})