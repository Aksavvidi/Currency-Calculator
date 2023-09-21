// const bcrypt = require('bcrypt');

// const knownPassword = '12345'; // This is a known password

// // Hash the known password
// bcrypt.hash(knownPassword, 10, (err, hashedPassword) => {
//   if (err) {
//     console.error('Error hashing password:', err);
//   } else {
//     // Simulate comparing the known password with the stored hashed password
//     bcrypt.compare(knownPassword, hashedPassword, (compareErr, isMatch) => {
//       if (compareErr) {
//         console.error('Error comparing passwords:', compareErr);
//       } else {
//         console.log('Is password a match?', isMatch); // Should print true
//       }
//     });
//   }
// });
const bcrypt = require('bcrypt');

const knownPassword = '12345';

bcrypt.hash(knownPassword, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hashedPassword);
  }
});