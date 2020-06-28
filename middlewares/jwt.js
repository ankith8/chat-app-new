var jwt = require('jsonwebtoken')
var { UserModel, USER_TYPES } = require("../models/User")

const SECRET_KEY = 'some-secret-key'

const encode = async (req,res,next) => {
    try {
        const {userId } = req.params
        const user = await UserModel.getUserById(userId)
        const payload = {
            userId:user._id,
            userType: user.type
        }
        const authToken = jwt.sign(payload,SECRET_KEY)
        console.log('Auth',authToken)
        req.authToken = authToken
        next()
    } catch (err){
        return res.status(400).json({success:false,message:err.error})
    }
}

const decode = (req,res,next) => {
    if(!req.headers['authorization']){
        return res.status(400).json({success:false,message:'No access token provided'})
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try{
        const decoded = jwt.verify(accessToken,SECRET_KEY)
        req.userId = decoded.userId
        req.userType = decoded.type
        return next()
    } catch (err){
        return res.status(401).json({success:false,message:err.message})
    }
}

module.exports = {
    decode : decode,
    encode : encode
}
