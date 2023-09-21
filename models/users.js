const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,'Username is required field'],
        max: 100,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: [true,'Password is required field'],
        max: 100,
        trim: true
    },
    email:{
        type: String,
        required: [true, 'email is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true,
        // validate: [validateEmail,"Email address is not valid" ] // ή με το match όπως απο κατω
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
               , "Email address is not valid"
            ]
    }
},{
    collection: 'Users',
    timestamps: true 
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('userSchema', userSchema)
