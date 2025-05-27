const jwt = require('jsonwebtoken')

const verifyJWTDeliver = (req, res, next) => {
    const authHeader = req.headers.authorization ||
        req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message:'Forbidden'})
            req.user = decoded
            console.log(req.user);
            if(decoded.role!="Deliver"&&decoded.role!="Admin"){
                return res.status(403).json({ message: 'Forbidden' })
            } 
            next()
        }
    )
}
module.exports = verifyJWTDeliver