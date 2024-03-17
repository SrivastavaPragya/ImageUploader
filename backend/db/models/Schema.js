const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});




const imageSchema = new mongoose.Schema({
   
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
});


const User = mongoose.model('User', userSchema);
const Image = mongoose.model('Image', imageSchema);



module.exports = { User, Image };
