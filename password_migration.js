const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/users');
// Load environment variables
require('dotenv').config();

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
// Function to hash a password
const hashPassword = async (plainTextPassword) => {
    return bcrypt.hash(plainTextPassword, 10); // Use the same salt rounds as in your app
  };
  
  (async () => {
    try {
      // Find all user documents with plain text passwords
      const usersWithPlainTextPasswords = await User.find({  password: { $exists: true }  });
  
      for (const user of usersWithPlainTextPasswords) {
        // Hash the plain text password
        const hashedPassword = await hashPassword(user.password);
  
        // Update the user document with the hashed password
        user.password = hashedPassword;
        await user.save();
      }
  
      console.log('Password migration completed successfully.');
    } catch (error) {
      console.error('Error migrating passwords:', error);
    } finally {
      // Close the database connection
      mongoose.connection.close();
    }
  })();