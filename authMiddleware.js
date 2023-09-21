// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.SECRET; 

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   console.log(authenticateToken);

//   if (token === null) return res.status(401).json({ msg: "Not Authorized" });

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(401).json({ msg: "Token verification failed" });
//     console.log(token);
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;