import { useState } from "react"
import { Box, TextField, Button, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import  Axios  from "axios";

const AddOrder=({show,setShow,fetchOrders})=>{

    const [ordername,setOrdername]=useState("");
    const [name,setName]=useState("");
    const [shopname,setShopname]=useState("");
    const [description,setDescription]=useState("");
    const [imageUrl,setImageUrl]=useState("");
    const [address,setAddress]=useState("");
   
    const clickClose=()=>{
        setShow(false)
    }

    
    
    const add = async () => {
        if (!ordername.trim()||!name.trim()||!shopname.trim()||!address){
          alert("ordername is required!");
          return;
        }

        const parts = address.split(",");
    if (parts.length < 2) {
      alert("Address must be in format: city, street");
      return;
    }

    const Address = {
      city: parts[0].trim(),
      street: parts.slice(1).join(",").trim(),
    };
        try {
          const res=await Axios.post("http://localhost:1700/api/order", {
            ordername,
            status:"not send",
            name,
            shopname,
            delivername:"",
            description:description||"",
            imageUrl:imageUrl||"",
            address:Address,
            });
            
          
          console.log(res.data);
          fetchOrders()
          clickClose();
          
        } catch (error) {
          console.error("error adding order", error);
        }
      };

  return ( 
    <Dialog open={show} onClose={clickClose}>
      <DialogTitle>New Order</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 5 }}>
          <TextField
            label="ordername"
            variant="standard"
            onChange={(e) => setOrdername(e.target.value)}
            fullWidth
          />

          <TextField
            label="name"
            variant="standard"
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="shopname"
            variant="standard"
            onChange={(e) => setShopname(e.target.value)}
            fullWidth
          />
                    <TextField
            label="description"
            variant="standard"
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />

                   <TextField
            label="address (city, street)"
            variant="standard"
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />

          <TextField
            label="imageUrl"
            variant="standard"
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
          />
         
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={clickClose} variant="outlined">Cancel</Button>
        <Button onClick={add} variant="contained">Add Order</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrder;