import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) =>{
    try {
        const {token} = req.headers
        if(!token){
            res.json({
                success:false,
                message: "Not Authorized, Log in again"
            })
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)

        if(decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            res.json({
                success:false,
                message: "Not Authorized, Log in again"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default adminAuth;