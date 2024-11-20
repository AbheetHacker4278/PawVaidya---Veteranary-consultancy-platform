import jwt from 'jsonwebtoken';

export const generatetokenandsetcookie = (res , userId) => {
    const token = jwt.sign({ userId } , process.env.JWT_SECRET , {
        expiresIn : "7d",
    })

    res.cookie("token" , token , {
        httpOnly : true , //save from XSS attacks
        secure : process.env.NODE_ENV === 'production',
        sameSite : "strict", //protect from csrf
        maxAge : 7 * 24 * 60 * 60  * 1000,
    });

    return token;
}