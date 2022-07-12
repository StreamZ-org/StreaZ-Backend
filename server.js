const express = require('express');
const dotenv = require('dotenv');

// Config env Variables
dotenv.config({path: './.env'});

const app = express();
const PORT = process.env.PORT || 3000;

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CORS
var cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configure Morgan
const morgan_config = require('./src/config/config_morgan');
app.use(morgan_config);

// Configure Database Connection
const connectDB = require('./src/config/config_db');
connectDB();   


////////////////////////////////////////////////////////////////////////////////////
// Routes
module.exports.router = require('express').Router();
app.get('/',(req,res)=>{
    console.log("Home page request");
    res.json("Home Page");
})

// Configure Auth Routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/auth',authRoutes);


app.listen(PORT,()=>{
    console.log(`Backend Server is running in ${process.env.NODE_ENV} mode on Port No :  ${process.env.PORT}`);
})