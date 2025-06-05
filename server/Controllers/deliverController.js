
const Deliver = require("../Models/deliver");
const bcrypt = require("bcrypt"); 

const createNewDeliver = async (req, res) => {
  const { username, password, name, email, phone, area, city, active } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  // בדוק אם שם המשתמש כבר קיים כדי למנוע כפילויות
  const duplicateDeliver = await Deliver.findOne({ username }).lean();
  if (duplicateDeliver) {
    return res.status(409).json({ message: 'Duplicate Deliver username' });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10); 

    const deliver = await Deliver.create({
      username,
      password: hashPassword, 
      name,
      email,
      phone,
      area,
      city,
      active: active !== undefined ? active : true, 
      currentOrder:null,
      roles: "Deliver" 
    });

    return res.status(201).json({ message: 'New deliver created successfully', deliver: deliver }); // החזר את המשלוחן שנוצר
  } catch (err) {
    console.error("Error creating new deliver:", err);
    return res.status(400).json({ message: 'Invalid deliver data or creation failed' });
  }
};


const getAllDelivers = async (req, res) => {
  const delivers = await Deliver.find().lean();
  if (!delivers?.length) {
    return res.status(400).json({ message: 'No delivers found' });
  }
  res.json(delivers);
};

// const updateDeliver = async (req, res) => {
//   const { _id, username, name, email, phone, area,city, active } = req.body;

//   if (!_id || !username  || !name) {
//     return res.status(400).json({ message: "Required fields are missing" });
//   }

//   const deliver = await Deliver.findById(_id).exec();
//   if (!deliver) {
//     return res.status(400).json({ message: 'Deliver not found' });
//   }

//   deliver.username = username;
//   deliver.name = name;
//   deliver.email = email;
//   deliver.phone = phone;
//   deliver.area = area;
//   deliver.city = city;
//   deliver.active = active;
 
//  const updatedDeliver = await deliver.save();
//   res.json(`Deliver '${updatedDeliver.name}' updated`);
// };

const updateDeliver = async (req, res) => {
  const { _id, username, password, name, email, phone, area, city, active,currentOrder } = req.body;

  // בדיקה של שדות חובה
  if (!_id || !username || !name) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  // שליפת המשלוחן מהמסד
  const deliver = await Deliver.findById(_id).exec();
  if (!deliver) {
    return res.status(400).json({ message: 'Deliver not found' });
  }

  // עדכון שדות חובה
  deliver.username = username;
  deliver.name = name;
  deliver.city = city;
  deliver.active = active;
  deliver.currentOrder = currentOrder || null;
  // הצפנת סיסמה אם נשלחה
  if (password !== undefined && password !== "") {
    const hashedPassword = await bcrypt.hash(password, 10);
    deliver.password = hashedPassword;
  }

  // עדכון שדות רשות אם נשלחו
  if (email !== undefined) deliver.email = email;
  if (phone !== undefined) deliver.phone = phone;
  if (area !== undefined) deliver.area = area;

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