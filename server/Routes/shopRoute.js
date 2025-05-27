const express=require('express')
const router=express.Router()

const shopController = require("../Controllers/shopController")
const verifyJWTAdmin=require("../middleware/verifyJWTadmin")

router.post("/",verifyJWTAdmin,shopController.createNewShop)
router.get("/",verifyJWTAdmin,shopController.getAllShop)
router.put("/",verifyJWTAdmin,shopController.updateShop)
router.delete("/:id",verifyJWTAdmin,shopController.deleteShop)
router.get("/:id",verifyJWTAdmin,shopController.getShopById)


module.exports=router