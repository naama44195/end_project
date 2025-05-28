
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
    // *** הוספת HASHING לסיסמה כאן ***
    const hashPassword = await bcrypt.hash(password, 10); // הצפנת הסיסמה

    const deliver = await Deliver.create({
      username,
      password: hashPassword, // שמור את הסיסמה המוצפנת
      name,
      email,
      phone,
      area,
      city,
      active: active !== undefined ? active : true, // הגדר ברירת מחדל ל-true אם לא נשלח
      roles: "Deliver" // ודא שהתפקיד מוגדר
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