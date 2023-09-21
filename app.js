const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const authController = require('./controllers/authController');
const authenticateToken = require('./authMiddleware');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

// Load environment variables
require('dotenv').config();

mongoose.set('strictQuery', false);

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

connectToDatabase();

// //Define the login route using the authController.login function
//app.post("/login", authController.login);

// //Protected route (requires authentication)
//app.get("/", authenticateToken, (req,res)=>{ 
  // Access the username from req.user
  //const { username } = req.user;
  //res.send(`Welcome ${username}`) 
//}) 

const user = require("./routes/UsersRoutes");
const currencies = require("./routes/currencyRoutes");
const exchangeRate = require("./routes/exchangeRateRoutes")
app.use('/api/user', user);
app.use('/api/currencies', currencies);
app.use('/api/exchangeRate', exchangeRate);

 
  app.listen(port, () => {
    console.log(`Server is listening in port ${port}`)
});
