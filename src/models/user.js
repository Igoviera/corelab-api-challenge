
const mongoose = require('mongoose');

const user = mongoose.model('user', {
    nome:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
    }
});



module.exports = user;