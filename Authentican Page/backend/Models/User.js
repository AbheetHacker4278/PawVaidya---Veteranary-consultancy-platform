const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    State : {
        type : String,
        required : true,
    },
    District : {
        type : String,
        required : true,
    },
    pincode : {
        type : String,
        required : true,
        unique : true
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;