import jwt from 'jsonwebtoken';

const generateToken=(res,userId) =>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
            console.log(token)
            console.log(process.env.JWT_SECRET)
    

    res.cookie('jwt', token, {
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'none',
        maxAge:30 * 24 * 60* 60 * 1000
    })
    console.log("console res.cookie",res.cookie,res.jwt)
}

export default generateToken;
