import { mailtrapClient , sender} from "./mailtrap.config.js";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailstemplate.js";
import { User } from "../models/user.model.js";

export const sendverificationemail = async (email , verifiationtoken) => {
    const recipient = [{email}]

    try{
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject : "Verify Your Email",
            html : VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode" , verifiationtoken),
            category : "Email Verification"
        })

        
    }catch(err){
        throw new Error(`Error sending verification email : ${err}`)
    }
}

export const sendwelcomeEmail = async (email , name) => {
    const recipient = [{ email }]

    try{
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            template_uuid : "84475f8b-6e09-4d85-8551-19031db26d66",
            template_variables : {
                company_info_name: "PawVadiya",
                name: name,
            },
        });
        console.log("Welcome email sent successfully!" , response);
    }catch(err){
        throw new Error(`Error sending welcome email: ${err}`)
    }
};


export const sendpasswordresetemail = async(email , resetURL) => {
    const recipient = [{ email }];
    try{
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject : "Reset Your Password",
            html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}" , resetURL),
            category : "Password Reset"
        })
    }catch(err){
        throw new Error(`Error sending password reset email: ${err}`)
    }
}

export const sendresetsuccessemail = async (email) => {
    const recipients = [{email}]
    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipients,
            subject : "Password reset successfully",
            html : PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{name}" , User.name),
            category : "Password Reset",
        });
    } catch (error) {
        throw new Error(`Error while sending the email: ${error}`)
    }
}