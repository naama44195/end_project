

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
// import Axios from 'axios';
// import { useSelector } from 'react-redux';



// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': { padding: theme.spacing(2) },
//   '& .MuiDialogActions-root': { padding: theme.spacing(1) },
// }));

// const DeliverOrder = ({ fetchOrders, fetchDelivers, updateOrder, deliver, setShow2, show2 }) => {
//   const deliverName = useSelector(state => state.token.name);


//   if (!updateOrder) return null;

//   const handleClose = () => { setShow2(false); };

//   const takeOrder = async () => {
//     try {
//       // 1. עדכון ההזמנה עם שם השליח
//       await Axios.put("http://localhost:1700/api/order", {
//         ...updateOrder,
//         delivername: deliverName,
//       });

//       // 2. עדכון השליח כפעיל
//       await Axios.put("http://localhost:1700/api/deliver", {
//         ...deliver,
//         active: true,
//       });

//       // 3. קודם עדכון רשימת ההזמנות
//       await fetchOrders();

//       // 4. אחרי זה עדכון רשימת השליחים
//       if (fetchDelivers) await fetchDelivers();

//       handleClose();
//     } catch (error) {
//       console.error("error taking order", error);
//       alert("שגיאה בעדכון ההזמנה/השליח");
//     }
//   };

//   return (
//     <React.Fragment>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={show2}
//       >
//         <DialogTitle
//           sx={{
//             m: 0, p: 2, minHeight: '100px',
//             display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1,
//           }}
//           id="customized-dialog-title"
//         >
//           <Typography variant="h6">{updateOrder.ordername}</Typography>
//           <Typography variant="body2" color="text.secondary">{updateOrder.description}</Typography>
//           <Typography variant="body2" color="text.secondary">
//             כתובת: {updateOrder.address.city}, {updateOrder.address.street}
//           </Typography>
//         </DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={(theme) => ({
//             position: 'absolute', right: 8, top: 8,
//             color: theme.palette.grey[500],
//           })}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent dividers>
//           <img
//             src={updateOrder.imageUrl}
//             alt="Preview"
//             style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={takeOrder}>לקחתי הזמנה</Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </React.Fragment>
//   );
// };

// export default DeliverOrder;

// client/src/Components/Delivers/DeliverOrder.jsx

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
// import Axios from 'axios';
// import { useDispatch } from 'react-redux';
// // ייבוא setDeliverActiveStatus במקום setToken לטיפול בסטטוס השליח
// import { setDeliverActiveStatus } from '../../redux/tokenSlice'; // וודאי שהנתיב נכון!


// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': { padding: theme.spacing(2) },
//   '& .MuiDialogActions-root': { padding: theme.spacing(1) },
// }));

// const DeliverOrder = ({ fetchOrders, updateOrder, deliver, setShow2, show2 }) => {
//   // deliver שמגיע מ-props הוא אובייקט המשלוחן המלא מ-state.auth.user
//   const dispatch = useDispatch();

//   if (!updateOrder) return null;

//   const handleClose = () => { setShow2(false); };

//   const takeOrder = async () => {
//     try {
//       // 1. עדכון ההזמנה: סטטוס "In delivery", ושם השליח
//       // חשוב לוודא שה-ID של ההזמנה נשלח ב-URL או ב-body
//       const updatedOrderResponse = await Axios.put(`http://localhost:1700/api/order/${updateOrder._id}`, {
//         status: "In delivery",
//         delivername: deliver.name, // שם השליח מאובייקט ה-deliver המלא
//         pickupTime: new Date().toISOString() // שמירת זמן הלקיחה
//       });

//       // 2. עדכון השליח: active: false, ו-currentOrder
//       // חשוב לוודא שה-ID של השליח נשלח ב-URL או ב-body
//       const updatedDeliverResponse = await Axios.put(`http://localhost:1700/api/deliver/${deliver._id}`, {
//         active: false,
//         currentOrder: updateOrder._id // שומרים את ה-ID של ההזמנה שהשליח לקח
//       });

//       // 3. עדכון ה-Redux store עם פרטי המשלוחן המעודכנים (בעיקר active ו-currentOrder)
//       // נשתמש ב-setDeliverActiveStatus החדש
//       dispatch(setDeliverActiveStatus({
//           active: false,
//           currentOrder: updateOrder._id
//       }));

//       // 4. עדכון רשימת ההזמנות במסך (כדי שההזמנה שנלקחה תיעלם)
//       await fetchOrders();

//       handleClose();
//       alert("הזמנה נלקחה בהצלחה!");
//     } catch (error) {
//       console.error("Error taking order:", error.response ? error.response.data : error.message);
//       alert("שגיאה בעדכון ההזמנה/השליח. אנא נסה שוב.");
//     }
//   };

//   return (
//     <React.Fragment>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={show2}
//       >
//         <DialogTitle
//           sx={{
//             m: 0, p: 2, minHeight: '100px',
//             display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1,
//           }}
//           id="customized-dialog-title"
//         >
//           <Typography variant="h6">{updateOrder.ordername}</Typography>
//           <Typography variant="body2" color="text.secondary">{updateOrder.description}</Typography>
//           <Typography variant="body2" color="text.secondary">
//             כתובת: {updateOrder.address.city}, {updateOrder.address.street}
//           </Typography>
//         </DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={(theme) => ({
//             position: 'absolute', right: 8, top: 8,
//             color: theme.palette.grey[500],
//           })}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent dividers>
//           <img
//             src={updateOrder.imageUrl}
//             alt="Preview"
//             style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={takeOrder}>לקחתי הזמנה</Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </React.Fragment>
//   );
// };

// export default DeliverOrder;

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
// import Axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { setDeliverActiveStatus } from '../../redux/tokenSlice';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': { padding: theme.spacing(2) },
//   '& .MuiDialogActions-root': { padding: theme.spacing(1) },
// }));

// const DeliverOrder = ({ fetchOrders, updateOrder, deliver, setShow2, show2 }) => {

//   const dispatch = useDispatch();
//   const deliver = useSelector(state => state.auth.user); 


//   const handleClose = () => {
//     setShow2(false);
//   };

//   const takeOrder = async () => {
//     try {
//       const {data}=await Axios.put("http://localhost:1700/api/order",
//         {
//           ...updateOrder,
//           status: "In progress",
//           delivername: deliver.name,
//         },{
//         headers: {
//           Authorization: `Bearer ${deliver}`,
//         },}
//       );}catch (error) {
//       console.error("Error taking order:", error.response ? error.response.data : error.message);
//       alert("שגיאה בעדכון ההזמנה. אנא נסה שוב.");
//     }

//       const takeOrder = async () => {
//     try {
//       const {data}=await Axios.put("http://localhost:1700/api/deliver",
//         {
//           ...deliver,
//           active: false,
//         },{
//         headers: {
//           Authorization: `Bearer ${deliver}`,
//         },}
//       );}catch (error) {
//       console.error("Error updating deliver status:", error.response ? error.response.data : error.message);
//       alert("שגיאה בעדכון משלוחן. אנא נסה שוב.");
//     }



//       handleClose();
 

//   return (
//     <React.Fragment>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={show2}
//       >
//         <DialogTitle
//           sx={{
//             m: 0, p: 2, minHeight: '100px',
//             display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1,
//           }}
//           id="customized-dialog-title"
//         >
//           <Typography variant="h6" component="div">{updateOrder.ordername}</Typography>
//           <Typography variant="body2" color="text.secondary">{updateOrder.description}</Typography>
//           <Typography variant="body2" color="text.secondary">
//             כתובת: {updateOrder.address.city}, {updateOrder.address.street}
//           </Typography>
//         </DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={(theme) => ({
//             position: 'absolute', right: 8, top: 8,
//             color: theme.palette.grey[500],
//           })}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent dividers>
//           <img
//             src={updateOrder.imageUrl}
//             alt="Preview"
//             style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={takeOrder}>take order</Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </React.Fragment>
//   );
// };

// export default DeliverOrder;

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Button, Typography, IconButton, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { current } from "@reduxjs/toolkit";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DeliverOrder = ({ fetchOrders, updateOrder, setShow2, show2 }) => {
  const deliver = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const handleClose = () => setShow2(false);

  const takeOrder = async () => {
    try {

      await axios.put(
        "http://localhost:1700/api/order",
        {
          ...updateOrder,
          status: "In progress",
          delivername: deliver.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("deliver:", deliver);
   
      await axios.put(
        "http://localhost:1700/api/deliver",
        {
       username: deliver.username,
       name: deliver.name,
       city: deliver.city,
       _id: deliver._id,
       roles: deliver.roles,
       currentOrder: updateOrder._id, // עדכון ה-ID של ההזמנה הנוכחית
          active: false
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchOrders();
      setShow2(false);
      alert("המשלוח נקלט בהצלחה!");
      navigate("/Deliver/myOrder"); 

    } catch (error) {
      console.error("Error taking order:", error.response ? error.response.data : error.message);
      alert("שגיאה בעדכון ההזמנה או המשלוחן. אנא נסה שוב.");
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={show2}
      >
        <DialogTitle
          sx={{
            m: 0, p: 2, minHeight: '100px',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1,
          }}
          id="customized-dialog-title"
        >
          <Typography variant="h6" component="div">{updateOrder.ordername}</Typography>
          <Typography variant="body2" color="text.secondary">{updateOrder.description}</Typography>
          <Typography variant="body2" color="text.secondary">
            כתובת: {updateOrder.address.city}, {updateOrder.address.street}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute', right: 8, top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <img
            src={updateOrder.imageUrl}
            alt="Preview"
            style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={takeOrder}>לקחתי את המשלוח</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default DeliverOrder;