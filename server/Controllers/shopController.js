// const Shop = require("../Models/shop");


// const createNewShop = async (req, res) => {

    
//     const {username,password,name,email,address,phone,active} = req.body
//     if (!name||!username||!password) { 
//     return res.status(400).json({ message: 'failds is required' })}
    
    
//     const shop = await Shop.create({ username,password,name,email,address,phone,active})
//     if (shop) {
//     return res.status(201).json({ message: 'New shop created' })
//     } else {
//     return res.status(400).json({ message: 'Invalid shop ' })}}


// const getAllShop = async (req, res) => {
    
//     const shops = await Shop.find().lean()
    
//     if (!shops?.length) {
//     return res.status(400).json({ message: 'No shops found' })
//     }
//     res.json(shops)
//     }

// //Update- Put
// const updateShop = async (req, res) => {
    
//     const {_id,username,password,name,address,phone,roles,active}= req.body
    
//     if (!_id || !username||!name||!password ) {
//     return res.status(400).json({message:"fields are required"})
//     }
    
//     const shop = await Shop.findById(_id).exec()
//     if (!shop) {
//     return res.status(400).json({ message: 'shop not found' })
//     }
//     shop.username = username
//     shop.password = password
//     shop.name = name
//     shop.address = address
//     shop.phone = phone
//     shop.roles = roles
//     shop.active = active
//     const updatedShop = await shop.save()
//     res.json(`'${updatedShop.name}' updated`)
//     }


// //Delete
// const deleteShop = async (req, res) => {
//     const { id } = req.params
    
//     const shop = await Shop.findById(id).exec()
//     if (!shop) {
//     return res.status(400).json({ message: 'shop not found' })
//     }
//     const result = await shop.deleteOne()
//     const reply=`shop '${result.name}' ID ${result._id} deleted`
//     res.json(reply)
//     }


// //getPostById
// const getShopById = async (req, res) => {
//     const {id} = req.params
    
//     const shop = await Shop.findById(id).lean()
    
//     if (!shop) {
//     return res.status(400).json({ message: 'No shop found' })
//     }
//     res.json(shop)
//     }




// module.exports={getShopById,deleteShop,updateShop,getAllShop,createNewShop}
const Shop = require("../Models/shop");

const createNewShop = async (req, res) => {
  const { username, password, name, email, address, phone, active } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const shop = await Shop.create({
      username,
      password,
      name,
      email,
      address,
      phone,
      active,
      roles: "Shop" // 👈 קובע במפורש תפקיד
    });

    return res.status(201).json({ message: 'New shop created' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Invalid shop' });
  }
};

const getAllShop = async (req, res) => {
  const shops = await Shop.find().lean();
  if (!shops?.length) {
    return res.status(400).json({ message: 'No shops found' });
  }
  res.json(shops);
};

const updateShop = async (req, res) => {
  const { _id, username, password, name, email, address, phone, active } = req.body;

  if (!_id || !username || !password || !name) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  const shop = await Shop.findById(_id).exec();
  if (!shop) {
    return res.status(400).json({ message: 'Shop not found' });
  }

  shop.username = username;
  shop.password = password;
  shop.name = name;
  shop.email = email;
  shop.address = address;
  shop.phone = phone;
  shop.active = active;
  // 👇 לא מעדכנים roles – שומר על "Shop" בלבד

  const updatedShop = await shop.save();
  res.json(`Shop '${updatedShop.name}' updated`);
};

const deleteShop = async (req, res) => {
  const { id } = req.params;

  const shop = await Shop.findById(id).exec();
  if (!shop) {
    return res.status(400).json({ message: 'Shop not found' });
  }

  const result = await shop.deleteOne();
  const reply = `Shop '${result.name}' ID ${result._id} deleted`;
  res.json(reply);
};

const getShopById = async (req, res) => {
  const { id } = req.params;

  const shop = await Shop.findById(id).lean();
  if (!shop) {
    return res.status(400).json({ message: 'No shop found' });
  }

  res.json(shop);
};

module.exports = {
  getShopById,
  deleteShop,
  updateShop,
  getAllShop,
  createNewShop
};