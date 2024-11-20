import mongoose from 'mongoose';

//created and updated fields will be automatically added into docs 
const userschema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    state : {
        type : String,
        required : true,
    },
    district : {
        type : String,
        required : true, 
    },
    lastlogin : {
        type : Date,
        default : Date.now
    },
    isverified : {
        type : Boolean,
        default : false
    },
    resetpasswordtoken : String,
    resetpasswordexpiresat : Date,
    verificationtoken : String,
    verificationtokenexpiresat : Date
} , {timestamps: true});

export const User = mongoose.model('User' , userschema);
