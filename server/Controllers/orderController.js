const Order = require("../Models/order");

//Create- Post
const createNewOrder = async (req, res) => {
    const {ordername,status,shopname,delivername,description,imageUrl,address} = req.body
    if (!ordername) { 
    return res.status(400).json({ message: 'name is required' })}
    
    
    const order = await Order.create({ ordername,status,shopname,delivername,description,imageUrl,address})
    if (order) {
    return res.status(201).json({ message: 'New order created' })
    } else {
    return res.status(400).json({ message: 'Invalid order ' })}}

//Read- Get
const getAllOrders = async (req, res) => {
    
    const orders = await Order.find().lean()
    
    if (!orders?.length) {
    return res.status(400).json({ message: 'No orders found' })
    }
    res.json(orders)
    }

//Update- Put
const updateOrder = async (req, res) => {
    
    const {_id, ordername,status,shopname,delivername,description,imageUrl,address}= req.body

    if (!_id || !ordername ) {
    return res.status(400).json({message:"fields are required"})
    }
    
    const order = await Order.findById(_id).exec()
    if (!order) {
    return res.status(400).json({ message: 'order not found' })
    }
    order.ordername = ordername
    order.status = status
    order.shopname = shopname
    order.delivername=delivername
    order.description = description
    order.imageUrl=imageUrl,
    order.address=address

    const updateOrder = await order.save()
    res.json(`'${updateOrder.ordername}' updated`)
    }


//Delete
const deleteOrder = async (req, res) => {
    const { id } = req.params
    
    const order = await Order.findById(id).exec()
    if (!order) {
    return res.status(400).json({ message: 'order not found' })
    }
    const result = await order.deleteOne()
    const reply=`deliver '${result.ordername}' ID ${result._id} deleted`
    res.json(reply)
    }


//getPostById
const getOrderById = async (req, res) => {
    const {id} = req.params
    
    const order = await Order.findById(id).lean()
    
    if (!order) {
    return res.status(400).json({ message: 'No order found' })
    }
    res.json(order)
    }

    const getOrdersByCity = async (req, res) => {
        try {
          const { city } = req.params;
      
          if (!city) {
            return res.status(400).json({ message: "Missing city parameter" });
          }
  
        const orders = await Order.find({ "address.city": { $regex: `^${city}$`, $options: 'i' } }).lean();

          res.json(orders);
        } catch (error) {
          console.error("Failed to fetch orders by city:", error);
          res.status(500).json({ message: "Server error" });
        }
      };



module.exports={getOrderById,deleteOrder,updateOrder,getAllOrders,createNewOrder,getOrdersByCity}