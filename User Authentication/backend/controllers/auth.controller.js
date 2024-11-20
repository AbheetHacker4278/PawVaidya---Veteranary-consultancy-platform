import { User } from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import { generatetokenandsetcookie } from '../utils/generatetokenandsetcookie.js'
import { sendverificationemail , sendwelcomeEmail , sendpasswordresetemail , sendresetsuccessemail
} from '../mailtrap/email.js';
import Crypto  from 'crypto';
import { response } from 'express';

export const signup = async (req , res) => {
    const {email , password , name , state , district} = req.body;
    try{
        if(!email || !password || !name || !state || !district){
            throw new Error("All field required");
        }

        const useralreadyexist = await User.findOne({email});
        if(useralreadyexist){
            return res.status(400).json({
            success:false , 
            message: "User already exists"});
        }
        const hashedpassword = await bcryptjs.hash(password, 10);
        const verificationtoken =Math.floor(100000 + Math.random() * 900000).toString();


        const user = new User({
            email,
            password: hashedpassword,
            name,
            state,
            district,
            verificationtoken,
            verificationtokenexpiresat : Date.now() + 24 * 60  * 60 * 1000 //24hour
        })

        await user.save();

        generatetokenandsetcookie(res , user._id);

        await sendverificationemail(user.email , verificationtoken);

        res.status(201).json({
            success : true,
            message : "User created successfull",
            user: {
                ...user._doc,
                password : undefined
            }
        })

    }catch(err){
        res.status(400).json({
            success : false,
            message : err.message
        })
    }
};

export const verifyEmail = async (req , res) => {
    const { code } = req.body;
    try{
        const user = await User.findOne({
            verificationtoken: code,
            verificationtokenexpiresat: {$gt : Date.now()},
        });

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid or Expired verification code"
            });
        }
        user.isverified = true;
        user.verificationtoken = undefined;
        user.verificationtokenexpiresat = undefined;
        await user.save();

        await sendwelcomeEmail(user.email , user.name);

        res.status(200).json({
            success : true,
            message : "Email Verified successfully",
            user : {
                ...user._doc,
                password : undefined,
            },
        });

    }catch(err){
        res.status(500).json({success:false , message : "Internal Server Error"});
    }
};

export const login = async (req , res) => {
    const {email , password} = req.body;
    try{
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid Credentials"
            });
        }
        const ispasswordvalid = await bcryptjs.compare(password , user.password);
        if(!ispasswordvalid){
            return res.status(400).json({
                success : false,
                message : "Invalid Credentials"
            })
        }

        generatetokenandsetcookie(res , user._id);

        user.lastlogin = new Date;
        await user.save();

        res.status(200).json({
            success : true,
            message : "Logged in successfully",
            user : {
                ...user._doc,
                password : undefined
            },
        });
    }catch(err){
        res.status(400).json({
            success : false ,
            message : err.message
        });
    }
};

export const logout = async (req , res) => {
    res.clearCookie("token");
    res.status(200).json({
        success : true,
        message : "Logged Out successfully"
    })
};      

export const forgotpassword = async (req , res) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                success : false ,
                message : "User not found"
            });
        }

        const resettoken = Crypto.randomBytes(20).toString("hex");
        const resettokenexpiresat = Date.now() + 1 * 60 * 60 * 1000; //1hour

        user.resetpasswordtoken = resettoken;
        user.resetpasswordexpiresat = resettokenexpiresat;

        await user.save();

        //send email notification
        await sendpasswordresetemail(user.email , `${process.env.CLIENT_URL}/reset-password/${resettoken}`);
        res.status(200).json({
            success : true ,
            message : "Password reset link send to your email address successfully"
        });
    }catch(err){
        console.log(err)
        res.status(400).json({
             success : false,
             message : err.message
        });
    }
};

export const resetpassword = async (req , res) => {
    try{
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetpasswordtoken : token,
            resetpasswordexpiresat : { $gt: Date.now() }, 
        });

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid or Expires token given"
            })
        }
        //update pasword
        const hashedpassword = await bcryptjs.hash(password,  10);
        user.password = hashedpassword;
        user.resetpasswordtoken = undefined;
        user.resetpasswordexpiresat = undefined;
        await user.save();

        await sendresetsuccessemail(user.email);

        res.status(200).json({
            success : true,
            message : "Password reset successfully"
        })
    }catch(err){
        res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

export const checkAuth = async (req , res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({
                success : false,
                message : 'User not found'
            })
        }
        res.status(200).json({
            success : true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        });
    }
};