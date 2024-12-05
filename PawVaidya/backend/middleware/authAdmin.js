import jwt from 'jsonwebtoken';

//admin auth middleware
const authAdmin = async(req , res , next) => {
    try{
        const {atoken} = req.headers;
        if(!atoken){
            return res.json({
                success: false,
                message: "not authorized to login"
            })
        }
        const token_decode = jwt.verify(atoken,  process.env.JWT_SECRET)
        if((token_decode.email !== process.env.ADMIN_EMAIL) && token_decode.password !== process.env.ADMIN_PASSWORD){
            return res.json({
                success: false,
                message: "not authorized to login"
            })
        }
        next()
    }catch(error){
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default authAdmin