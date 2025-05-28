// 

// import { useState } from "react";
// import { Box, TextField, Button, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import Axios from "axios";
// import { useSelector } from "react-redux"; // <--- הוספה: לייבא את useSelector

// const AddOrder = ({ show, setShow, fetchOrders }) => {

//     const [ordername, setOrdername] = useState("");
//     const [name, setName] = useState("");
//     const [shopname, setShopname] = useState("");
//     const [description, setDescription] = useState("");
//     const [imageUrl, setImageUrl] = useState("");
//     const [address, setAddress] = useState("");

//     // <--- הוספה: קבלת ה-accessToken מה-Redux store
//     const accessToken = useSelector(state => state.auth.accessToken);

//     const clickClose = () => {
//         setShow(false)
//     }

//     const add = async () => {
//         if (!ordername.trim() || !name.trim() || !shopname.trim() || !address) {
//             alert("ordername is required!");
//             return;
//         }

//         const parts = address.split(",");
//         if (parts.length < 2) {
//             alert("Address must be in format: city, street");
//             return;
//         }

//         const Address = {
//             city: parts[0].trim(),
//             street: parts.slice(1).join(",").trim(),
//         };

//         // <--- הוספה: בדיקה אם יש טוקן לפני שליחת הבקשה
//         if (!accessToken) {
//             console.error("Access Token is missing. Cannot add order.");
//             alert("שגיאת הרשאה: טוקן גישה חסר. אנא התחבר מחדש.");
//             return;
//         }

//         try {
//             const res = await Axios.post("http://localhost:1700/api/order", {
//                 ordername,
//                 status: "not send",
//                 name,
//                 shopname,
//                 delivername: "",
//                 description: description || "",
//                 imageUrl: imageUrl || "",
//                 address: Address,
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${accessToken}` // <--- הוספה: שליחת הטוקן בכותרת
//                 }
//             });

//             console.log(res.data);
//             fetchOrders();
//             clickClose();

//         } catch (error) {
//             console.error("error adding order", error.response ? error.response.data : error.message);
//             if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//                 alert("אין לך הרשאה להוסיף הזמנות. אנא התחבר מחדש או פנה למנהל.");
//             } else {
//                 alert("אירעה שגיאה בהוספת ההזמנה.");
//             }
//         }
//     };

//     return (
//         <Dialog open={show} onClose={clickClose}>
//             <DialogTitle>New Order</DialogTitle>
//             <DialogContent>
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 5 }}>
//                     <TextField
//                         label="ordername"
//                         variant="standard"
//                         onChange={(e) => setOrdername(e.target.value)}
//                         fullWidth
//                     />

//                     <TextField
//                         label="name"
//                         variant="standard"
//                         onChange={(e) => setName(e.target.value)}
//                         fullWidth
//                     />

//                     <TextField
//                         label="shopname"
//                         variant="standard"
//                         onChange={(e) => setShopname(e.target.value)}
//                         fullWidth
//                     />
//                     <TextField
//                         label="description"
//                         variant="standard"
//                         onChange={(e) => setDescription(e.target.value)}
//                         fullWidth
//                     />

//                     <TextField
//                         label="address (city, street)"
//                         variant="standard"
//                         onChange={(e) => setAddress(e.target.value)}
//                         fullWidth
//                     />

//                     <TextField
//                         label="imageUrl"
//                         variant="standard"
//                         onChange={(e) => setImageUrl(e.target.value)}
//                         fullWidth
//                     />

//                 </Box>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={clickClose} variant="outlined">Cancel</Button>
//                 <Button onClick={add} variant="contained">Add Order</Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default AddOrder;

import { useState } from "react"
import { Box, TextField, Button, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Axios from "axios";
import { useSelector } from "react-redux"; // וודאי שזה קיים

const AddOrder = ({ show, setShow, fetchOrders }) => {

    const [ordername, setOrdername] = useState("");
    const [name, setName] = useState("");
    const [shopname, setShopname] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [address, setAddress] = useState("");

    // קבלת ה-accessToken מה-Redux store
    const accessToken = useSelector(state => state.auth.accessToken);

    const clickClose = () => {
        setShow(false)
    }

    const add = async () => {
        if (!ordername.trim() || !name.trim() || !shopname.trim() || !address) {
            alert("Order name, customer name, shop name, and address are required!"); // הודעה ברורה יותר
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

        // בדיקה אם יש טוקן לפני שליחת הבקשה
        if (!accessToken) {
            console.error("Access Token is missing. Cannot add order.");
            alert("שגיאת הרשאה: טוקן גישה חסר. אנא התחבר מחדש.");
            return;
        }

        try {
            const res = await Axios.post("http://localhost:1700/api/order", {
                ordername,
                status: "not send", // סטטוס ראשוני
                name,
                shopname,
                delivername: "", // ריק בהתחלה כי עדיין לא נמסר
                description: description || "",
                imageUrl: imageUrl || "",
                address: Address,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}` // שליחת הטוקן בכותרת Authorization
                }
            });

            console.log("Order added successfully:", res.data);
            fetchOrders(); // רענון רשימת ההזמנות לאחר הוספה
            clickClose(); // סגירת הדיאלוג
            alert("ההזמנה נוספה בהצלחה!"); // הודעת הצלחה
        } catch (error) {
            console.error("Error adding order:", error.response ? error.response.data : error.message);
            if (error.response) {
                if (error.response.status === 401) {
                    alert("אין לך הרשאה לבצע פעולה זו (טוקן לא תקין או חסר).");
                } else if (error.response.status === 403) {
                    alert("אין לך הרשאה להוסיף הזמנות. ודא שהתפקיד שלך מאפשר זאת.");
                } else {
                    alert(`אירעה שגיאה בהוספת ההזמנה: ${error.response.data.message || error.message}`);
                }
            } else {
                alert("אירעה שגיאה ברשת או בשרת בעת הוספת ההזמנה.");
            }
        }
    };

    return (
        <Dialog open={show} onClose={clickClose}>
            <DialogTitle>הוספת הזמנה חדשה</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 5 }}>
                    <TextField
                        label="שם ההזמנה"
                        variant="standard"
                        value={ordername} // כדי לנקות את השדה אחרי שליחה
                        onChange={(e) => setOrdername(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="שם הלקוח"
                        variant="standard"
                        value={name} // כדי לנקות את השדה אחרי שליחה
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="שם החנות"
                        variant="standard"
                        value={shopname} // כדי לנקות את השדה אחרי שליחה
                        onChange={(e) => setShopname(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="תיאור (אופציונלי)"
                        variant="standard"
                        value={description} // כדי לנקות את השדה אחרי שליחה
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="כתובת (עיר, רחוב ומספר בית)" // הבהרה לגבי הפורמט
                        variant="standard"
                        value={address} // כדי לנקות את השדה אחרי שליחה
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="כתובת תמונה (URL) (אופציונלי)"
                        variant="standard"
                        value={imageUrl} // כדי לנקות את השדה אחרי שליחה
                        onChange={(e) => setImageUrl(e.target.value)}
                        fullWidth
                    />

                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={clickClose} variant="outlined">ביטול</Button>
                <Button onClick={add} variant="contained">הוסף הזמנה</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddOrder;