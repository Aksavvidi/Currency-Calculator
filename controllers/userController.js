const Users = require('../models/users');

// Implement CRUD operations for Users
//Retrieve a list of all users
exports.findAll =  async (req, res) => {
    try{
        const users = await Users.find();
        console.log('Users found:', users);
        res.status(200).json({users});
        console.log("Success in finding All Users");
    }catch(error){
        res.status(400).json({error : "Problem in finding users"});
        console.log(error);
    }   
};

//Find a specific user by its username.
exports.findOne = async (req, res) => {
    try{
        const username = req.params.username;
        console.log("Find User with username", username);
        const users = await Users.findOne({username});

        if(!users) {
            return res.status(404).json({ status: false, data: 'User not found' }); 
        }
        res.status(200).json({status: true, data: users});
        console.log('Success in finding user', username);
    }catch(error){
        console.error(`Problem in finding user with username ${username}`, error);  
        res.status(400).json({ status: false, data: error });
    } 
};

// Create a new User 
exports.createUser = async (req, res) => {
    try{
        const newUser = new Users({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        const createdUser = await newUser.save();

        res.status(201).json({status : true, data : createdUser});
        console.log('Success in creating user', createdUser);
    }catch(error){
        console.error('Error in creating user', error);
        res.status(400).json({ status: false, data: error });
    }
};

//Update an existing user by its username.
exports.updateUser = async (req, res) =>{
    const userUsername = req.params.username;

    const updatedData = {
        username : req.body.username,
        password : req.body.password,
        email: req.body.email
    };
    console.log("user found: " + userUsername);
    console.log(updatedData);

    try {
        const result = await Users.findOneAndUpdate(
            {username: userUsername},
            updatedData,
            {new : true}
        );
        res.status(200).json({status: true, data: result});
        console.log("Success in updating user");
    }catch(error){
        res.status(400).json({ status: false, data: error });
      console.log('Error in updating user', error);
    }
};

//Delete a user  by its username
exports.deleteUser = async (req, res) => {
    try {
        const username = req.params.username;
        const deletedUser = await Users.findOneAndDelete({username:username});

        if(!deletedUser){
            return res.status(404).json({ status: false, message: 'User not found' });  
        }
        res.status(200).json({ status: true, message: 'User deleted successfully' });
        console.log('Success in deleting user', deletedUser);
    }catch(error){
        console.error('Error in deleting user', error);
        res.status(400).json({ status: false, data: error });
    }
}

