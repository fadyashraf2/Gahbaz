const jwt = require('jsonwebtoken');
const secretKey = require('../config.json').adminSecretKey;

const adminAuth = async (req,res,next)=>{
    try{
        console.log( console.log(JSON.stringify(req.headers)));
        const token = req.header('Authorization').replace('Bearer ', '' );
        console.log(token)
        const decoded = jwt.verify(token,secretKey); // == return ID ==  //
        console.log(decoded);
        const admin = await Admin.findOne({_id: decoded._id ,'tokens.token': token })
        
        if(!admin){
            throw new Error("you are not authorized!");       
        }

        req.admin = admin ;
        req.token = token;
        next();
        
    }catch (error){
        console.log(error);
        res.status(401).send({ 'error' : 'please log in '});
    }
    
}
module.exports = adminAuth