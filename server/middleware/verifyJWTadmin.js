// const jwt = require('jsonwebtoken')
// const verifyJWTAdmain = (req, res, next) => {
//     console.log("dddddddd");
    
//     const outhHeader = req.headers.authorization || req.headers.Authorization
//     console.log(outhHeader);
//     const token = outhHeader.split(' ')[1]
//     jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if (err) return res.status(403).json({ message: 'Forbidden' })
//             req.user = decoded
//         console.log(decoded);
//             if (decoded.role!="Admin") {
//                 return res.status(403).json({ message: 'Forbidden Admin' })
//             }
//             next()
//         }
//     )
// }
// module.exports = verifyJWTAdmain


const jwt = require('jsonwebtoken');

const verifyJWTAdmin = (req, res, next) => {

    console.log("Verifying JWT for Admin...");
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        if (decoded.role !== "Admin") {
            return res.status(403).json({ message: 'Forbidden Admin' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyJWTAdmin;