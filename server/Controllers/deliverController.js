// const Deliver = require("../Models/deliver");

// //Create- Post
// const createNewDeliver = async (req, res) => {
//     const {username,password,name,email,phone,area,active} = req.body
//     if (!name|| !username||!password) { 
//     return res.status(400).json({ message: 'failds is required' })}
    
    
//     const deliver = await Deliver.create({ username,password,name,email,phone,area,active})
//     if (deliver) {
//     return res.status(201).json({ message: 'New deliver created' })
//     } else {
//     return res.status(400).json({ message: 'Invalid deliver ' })}}

// //Read- Get
// const getAllDelivers = async (req, res) => {
    
//     const delivers = await Deliver.find().lean()
    
//     if (!delivers?.length) {
//     return res.status(400).json({ message: 'No delivers found' })
//     }
//     res.json(delivers)
//     }

// //Update- Put
// const updateDeliver = async (req, res) => {
    
//     const {_id,username,password,name,email,phone,area,roles,active}= req.body

    
    
//     if (!_id || !username||!password||!name ) {
//     return res.status(400).json({message:"fields are required"})
//     }
    
//     const deliver = await Deliver.findById(_id).exec()
//     if (!deliver) {
//     return res.status(400).json({ message: 'deliver not found' })
//     }
//     deliver.username = username
//     deliver.password = password
//     deliver.name = name
//     deliver.email = email
//     deliver.phone = phone
//     deliver.area = area
//     deliver.roles = roles
//     deliver.active = active
//     const updatedDeliver = await deliver.save()
//     res.json(`'${updatedDeliver.name}' updated`)
//     }


// //Delete
// const deleteDeliver = async (req, res) => {
//     const { id } = req.params
    
//     const deliver = await Deliver.findById(id).exec()
//     if (!deliver) {
//     return res.status(400).json({ message: 'deliver not found' })
//     }
//     const result = await deliver.deleteOne()
//     const reply=`deliver '${result.name}' ID ${result._id} deleted`
//     res.json(reply)
//     }


// //getPostById
// const getDeliverById = async (req, res) => {
//     const {id} = req.params
    
//     const deliver = await Deliver.findById(id).lean()
    
//     if (!deliver) {
//     return res.status(400).json({ message: 'No deliver found' })
//     }
//     res.json(deliver)
//     }




// module.exports={getDeliverById,deleteDeliver,updateDeliver,getAllDelivers,createNewDeliver}
const Deliver = require("../Models/deliver");

const createNewDeliver = async (req, res) => {
  const { username, password, name, email, phone, area,city, active } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const deliver = await Deliver.create({
      username,
      password,
      name,
      email,
      phone,
      area,
      city,
      active,
      roles: "Deliver" 
    });

    return res.status(201).json({ message: 'New deliver created' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Invalid deliver' });
  }
};

const getAllDelivers = async (req, res) => {
  const delivers = await Deliver.find().lean();
  if (!delivers?.length) {
    return res.status(400).json({ message: 'No delivers found' });
  }
  res.json(delivers);
};

const updateDeliver = async (req, res) => {
  const { _id, username, password, name, email, phone, area,city, active } = req.body;

  if (!_id || !username || !password || !name) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  const deliver = await Deliver.findById(_id).exec();
  if (!deliver) {
    return res.status(400).json({ message: 'Deliver not found' });
  }

  deliver.username = username;
  deliver.password = password;
  deliver.name = name;
  deliver.email = email;
  deliver.phone = phone;
  deliver.area = area;
  deliver.city = city;
  deliver.active = active;
 
 const updatedDeliver = await deliver.save();
  res.json(`Deliver '${updatedDeliver.name}' updated`);
};

const deleteDeliver = async (req, res) => {
  const { id } = req.params;

  const deliver = await Deliver.findById(id).exec();
  if (!deliver) {
    return res.status(400).json({ message: 'Deliver not found' });
  }

  const result = await deliver.deleteOne();
  const reply = `Deliver '${result.name}' ID ${result._id} deleted`;
  res.json(reply);
};

const getDeliverById = async (req, res) => {
  const { id } = req.params;

  const deliver = await Deliver.findById(id).lean();
  if (!deliver) {
    return res.status(400).json({ message: 'No deliver found' });
  }

  res.json(deliver);
};



module.exports = {
  getDeliverById,
  deleteDeliver,
  updateDeliver,
  getAllDelivers,
  createNewDeliver
};