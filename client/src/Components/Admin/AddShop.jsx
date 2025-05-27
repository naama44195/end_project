import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Divider
} from "@mui/material";
import Axios from "axios";

const AddOrder = ({ show, setShow, shops, setShops, fetchShops }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")



    const clickClose = () => {
        setShow(false);
    };

    const add = async () => {
        if (!username.trim() && !password) {
            alert("username and password are required!");
            return;
        }
        try {
            const res = await Axios.post("http://localhost:1700/api/shop", {
                username,
                password: password,
                name: name,
                email: email,
                phone: phone,
                address:address,
                imageUrl,imgUrl
            });

            setOrders([...shops, res.data]);
            fetchShops();
            clickClose();
        } catch (error) {
            console.error("Error adding order", error);
        }
    };

    return (
        <Dialog open={show} onClose={clickClose} maxWidth="sm" fullWidth>
            {/* <DialogTitle
                sx={{
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "1.6rem",
                    py: 2,
                }}
            >
                Add New Todo
            </DialogTitle> */}

            <DialogContent sx={{ py: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 3, color: "#555" }}>
                    Fill in the details for your task:
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="Tags"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Tags"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Tags"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Tags"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                    />
                      <TextField
                        label="Tags"
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                    />


                </Box>
            </DialogContent>

            <Divider />

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    onClick={clickClose}
                    variant="outlined"
                    sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 500,
                        color: "#4caf50",
                        borderColor: "#4caf50",
                        "&:hover": {
                            borderColor: "#388e3c",
                            color: "#388e3c",
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={add}
                    variant="contained"
                    sx={{
                        borderRadius: 3,
                        backgroundColor: "#4caf50",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                            backgroundColor: "#388e3c",
                        },
                    }}
                >
                    Add Deliver
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddOrder;