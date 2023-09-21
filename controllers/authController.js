// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const Users = require('../models/users')
// const JWT_SECRET = process.env.SECRET;

//exports.login = async (req, res) => {
    // try {
    //     const { username, password } = req.body;
    //     console.log(username, password);

    //     // Check if a user with the provided username exists
    //     const user = await Users.findOne({ username });
    //     console.log('User found', user);
    
    //     if (!user) {
    //       // If the user doesn't exist, respond with an error message
    //       return res.json({ msg: "Please enter a valid username" });
    //     }
    
    //     // If the user exists, compare the provided password with the hashed password in the database
    //     const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
    //     console.log('Provided password:', password);
    //     console.log('Hashed password from the database:', user.password);
    //     console.log('bcrypt.compare result:', isPasswordValid);

    //     if (!isPasswordValid) {
    //       // If the password is not valid, respond with an error message
    //       return res.json({ msg: "Invalid password" });

    //     }
    
    //     // If the password is valid, generate a JWT token for the user
    //     const accessToken = jwt.sign(
    //       { username, id: user._id },
    //       JWT_SECRET,
          
    //       {
    //         expiresIn: process.env.NODE_ENV === "production" ? "6h" : "2 days",
    //       }
    //     );
  
    //     // Respond with a success message and the JWT token
    //     res.json({ msg: "User logged in!", accessToken });
    // } catch (err) {
    //   console.log(err);
    //   // If an error occurs, respond with a server error message
    //   res.status(503).json({ msg: "Server error!" });
    // }
 // };
  