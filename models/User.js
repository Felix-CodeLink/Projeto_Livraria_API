const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: uuidv4
    },
    name: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'E-mail invalido',
        ],
    },
    //classificação de livros
    birthday: {
        type: Date,
        required: true,
    }, 
    password: {
        type: String,
        required: [true, 'Adicione uma senha'],
        minlength: 6,
    },
})

module.exports = mongoose.model('User', UserSchema);