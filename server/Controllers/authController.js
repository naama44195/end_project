
// const bcrypt = require("bcrypt");
// const Deliver = require("../Models/deliver");
// const Shop=require("../Models/shop")
// const Admin=require("../Models/admin")
// const jwt = require("jsonwebtoken");


// const login = async (req, res) => {

//     const { username, password } = req.body

//     if (!username || !password) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }
//     const foundDeliver = await Deliver.findOne({ username }).lean()
//     const foundShop = await Shop.findOne({ username }).lean()
//     const foundAdmin = await Shop.findOne({ username }).lean()
//     if (!foundShop && !foundDeliver&&!foundAdmin) {
//         return res.status(401).json({ message: 'Unauthorized' })
//     }
//     if (foundShop) {
//         const match = await bcrypt.compare(password, foundShop.password)
//         if (!match) return res.status(401).json({ message: 'Unauthorized' })
//         const shopInfo = {
//             _id: foundShop._id,
//             name: foundShop.name,
//             username: foundShop.username,
//             roles: foundShop.roles,
//             active: foundShop.active,
//         };
//         const accessToken =
//             jwt.sign(shopInfo, process.env.ACCESS_TOKEN_SECRET)
//         res.json({ accessToken: accessToken, user: shopInfo })
//     }
//     if (foundDeliver) {
//         const match = await bcrypt.compare(password, foundDeliver.password)
//         if (!match) return res.status(401).json({ message: 'Unauthorized' })
//         const deliverInfo = {
//             _id: foundDeliver._id,
//             name: foundDeliver.name,
//             username: foundDeliver.username,
//             roles: foundDeliver.roles,
//             area: foundDeliver.area,
//             city: foundDeliver.city
//         };
//         const accessToken = jwt.sign(deliverInfo, process.env.ACCESS_TOKEN_SECRET);

//         res.json({ accessToken: accessToken, user: deliverInfo, role: foundDeliver.roles });
//     }
//     if (foundAdmin) {
//         const match = await bcrypt.compare(password, foundAdmin.password)
//         if (!match) return res.status(401).json({ message: 'Unauthorized' })
//         const adminInfo = {
//             _id: foundDeliver._id,
//             username: foundDeliver.username
//         };
//         const accessToken = jwt.sign(adminInfo, process.env.ACCESS_TOKEN_SECRET);

//         res.json({ accessToken: accessToken, user: adminInfo, role: foundAdmin.roles });
//     }
// }





// const register = async (req, res) => {
//     const { username, password, name, email, phone,roles,city,area,active } = req.body;

//     if (!username || !password || !name || !email || !phone || !city) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     const duplicateDeliver = await Deliver.findOne({ username }).lean();

//     if (duplicateDeliver) {
//         return res.status(409).json({ message: "Duplicate Deliver" });
//     }

//     const hashpassword = await bcrypt.hash(password, 10);

//     const deliver = await Deliver.create({ username, password: hashpassword, name, email, phone,roles,area,city, active});

//     if (!deliver) {
//         return res.status(400).json({ message: "Bad request" });
//     }
//     res.status(201).json({ message: `deliver ${deliver.name} created `}); 
// };

// const registerShop = async (req, res) => {
//     const { username, password, name, email, phone,roles,address } = req.body;

//     if (!username || !password || !name || !email || !phone ) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

    

//     const duplicateShop = await Shop.findOne({ username }).lean();

//     if (duplicateShop) {
//         return res.status(409).json({ message: "Duplicate Shop" });
//     }

//     const hashpassword = await bcrypt.hash(password, 10);

//     const shop = await Shop.create({ username, password: hashpassword, name, email, phone,roles,address});

//     if (!shop) {
//         return res.status(400).json({ message: "Bad request" });
//     }

//     res.status(201).json({ message: `deliver ${shop.name} created `});
// };


// module.exports = { login, register ,registerShop};



const bcrypt = require("bcrypt");
const Deliver = require("../Models/deliver");
const Shop = require("../Models/shop")
const jwt = require("jsonwebtoken");
const Admin = require('../Models/admin')

const login = async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundDeliver = await Deliver.findOne({ username }).lean()
    const foundShop = await Shop.findOne({ username }).lean()
    const foundAdmin = await Admin.findOne({ username }).lean()



    if (!foundShop && !foundDeliver && !foundAdmin) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    if (foundShop) {
        const match = await bcrypt.compare(password, foundShop.password)
        if (!match) return res.status(401).json({ message: 'Unauthorized' })
        const shopInfo = {
            _id: foundShop._id,
            name: foundShop.name,
            username: foundShop.username,
            roles: foundShop.roles,
            active: foundShop.active
        };
        const accessToken =
            jwt.sign(shopInfo, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken, user: shopInfo, role: foundShop.roles })
    }
    if (foundDeliver) {
        const match = await bcrypt.compare(password, foundDeliver.password)
        if (!match) return res.status(401).json({ message: 'Unauthorized' })
        const deliverInfo = {
            _id: foundDeliver._id,
            name: foundDeliver.name,
            username: foundDeliver.username,
            roles: foundDeliver.roles,
            area: foundDeliver.area
        };
        const accessToken = jwt.sign(deliverInfo, process.env.ACCESS_TOKEN_SECRET);

        res.json({ accessToken: accessToken, user: deliverInfo, role: foundDeliver.roles });
    }
    if (foundAdmin) {
        const match = await bcrypt.compare(password, foundAdmin.password)
        if (!match) return res.status(401).json({ message: 'Unauthorized' })
        const adminInfo = {
            _id: foundAdmin._id,
            username: foundAdmin.username,
            roles: foundAdmin.roles,
        };
        const accessToken =
            jwt.sign(adminInfo, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken, user: adminInfo, role: foundAdmin.roles })
    }
}




const registerDeliver = async (req, res) => {
    const { username, password, name, email, phone, area } = req.body;

    if (!username || !password || !name || !email || !phone || !area) {
        return res.status(400).json({ message: "All fields are required" });
    }


    const duplicateDeliver = await Deliver.findOne({ username }).lean();

    if (duplicateDeliver) {
        return res.status(409).json({ message: "Duplicate Deliver" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const deliver = await Deliver.create({ username, password: hashpassword, name, email, phone });

    if (!deliver) {
        return res.status(400).json({ message: "Bad request" });
    }

    res.status(201).json({ message: `${deliver.name} created ` });
};


const registerShop = async (req, res) => {
    const { username, password, name, email, phone, address } = req.body;

    if (!username || !password || !name || !email || !phone || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }


    const duplicateShop = await Shop.findOne({ username }).lean();

    if (duplicateShop) {
        return res.status(409).json({ message: "Duplicate Shop" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const shop = await Shop.create({ username, password: hashpassword, name, email, phone, address });

    if (!shop) {
        return res.status(400).json({ message: "Bad request" });
    }

    res.status(201).json({ message: `${shop.name} created ` });
};

const registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }


    const duplicateAdmin = await Admin.findOne({ username }).lean();

    if (duplicateAdmin) {
        return res.status(409).json({ message: "Duplicate Admin" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ username, password: hashpassword });

    if (!admin) {
        return res.status(400).json({ message: "Bad request" });
    }

    res.status(201).json({ message: `${admin.username} created ` });
};





module.exports = { login, registerDeliver, registerShop, registerAdmin };