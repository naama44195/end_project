
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
// import { fetchDeliversContext } from '../Common/commonFunction';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// const DeliverOrder = ({ fetchOrders, updateOrder, updateDeliver,setShow2, show2 }) => {

//   const { delivers } = useContext(fetchDeliversContext);
//   const deliverName = useSelector(state => state.token.name);
//   if (!updateOrder) return null;

//   const handleClose = () => {
//     setShow2(false);
//   };

//   const updateDeliverName= async () => {
//     try {
//       const res = await Axios.put("http://localhost:1700/api/order", {
//         _id: updateOrder._id,
//         ordername: updateOrder.ordername,
//         status: updateOrder.status,
//         shopname: updateOrder.shopname,
//         delivername: deliverName,
//         description: updateOrder.description,
//         imageUrl: updateOrder.imageUrl,
//         address: updateOrder.address
//       });
//       fetchOrders();
//       handleClose();
//     } catch (error) {
//       console.error("error update order", error);
//     } 
//   };

//     const updateDeliverActive = async () => {
//     try {
//       const res2 = await Axios.put("http://localhost:1700/api/deliver", {
//         _id: updateDeliver._id,
//         username: updateDeliver.username,
//         password: updateDeliver.password,
//         name: updateDeliver.name,
//         email: updateDeliver.email,
//         phone: updateDeliver.phone,
//         area: updateDeliver.area,
//         active: true
//       });

//       delivers();
//       handleClose();
//     } catch (error) {
//       console.error("error update deliver", error);
//     }
 
//     }


//   return (
//     <React.Fragment>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={show2}
//       >
//         <DialogTitle
//           sx={{
//             m: 0,
//             p: 2,
//             minHeight: '100px',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'flex-start',
//             gap: 1,
//           }}
//           id="customized-dialog-title"
//         >
//           <Typography variant="h6">{updateOrder.ordername}</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {updateOrder.description}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             כתובת: {updateOrder.address.city}, {updateOrder.address.street}
//           </Typography>
//         </DialogTitle>

//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={(theme) => ({
//             position: 'absolute',
//             right: 8,
//             top: 8,
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
//         <Button onClick={() => { updateDeliverName(); updateDeliverActive(); }}>
//             Take Order
//           </Button>
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
// import { useSelector } from 'react-redux';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// const DeliverOrder = ({ fetchOrders, updateOrder, deliver, setShow2, show2 }) => {
// const deliverName = useSelector(state => state.token.name);

//   if (!updateOrder) return null;

//   const handleClose = () => {
//     setShow2(false);
//   };

//   const takeOrder = async () => {
//     try {
//       // עדכון ההזמנה עם שם השליח
//       await Axios.put("http://localhost:1700/api/order", {
//         ...updateOrder,
//         delivername: deliverName, // עדכון השדה
//       });

//       // עדכון השליח כפעיל
//       await Axios.put("http://localhost:1700/api/deliver", {
//         ...deliver,
//         active: true,
//       });

//       fetchOrders();
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
//             m: 0,
//             p: 2,
//             minHeight: '100px',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'flex-start',
//             gap: 1,
//           }}
//           id="customized-dialog-title"
//         >
//           <Typography variant="h6">{updateOrder.ordername}</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {updateOrder.description}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             כתובת: {updateOrder.address.city}, {updateOrder.address.street}
//           </Typography>
//         </DialogTitle>

//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={(theme) => ({
//             position: 'absolute',
//             right: 8,
//             top: 8,
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
//           <Button onClick={takeOrder}>
//             Take Order
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </React.Fragment>
//   );
// };

// export default DeliverOrder;

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { useSelector } from 'react-redux';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2) },
  '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}));

const DeliverOrder = ({ fetchOrders, fetchDelivers, updateOrder, deliver, setShow2, show2 }) => {
  const deliverName = useSelector(state => state.token.name);


  if (!updateOrder) return null;

  const handleClose = () => { setShow2(false); };

  const takeOrder = async () => {
    try {
      // 1. עדכון ההזמנה עם שם השליח
      await Axios.put("http://localhost:1700/api/order", {
        ...updateOrder,
        delivername: deliverName,
      });

      // 2. עדכון השליח כפעיל
      await Axios.put("http://localhost:1700/api/deliver", {
        ...deliver,
        active: true,
      });

      // 3. קודם עדכון רשימת ההזמנות
      await fetchOrders();

      // 4. אחרי זה עדכון רשימת השליחים
      if (fetchDelivers) await fetchDelivers();

      handleClose();
    } catch (error) {
      console.error("error taking order", error);
      alert("שגיאה בעדכון ההזמנה/השליח");
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
          <Typography variant="h6">{updateOrder.ordername}</Typography>
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
          <Button onClick={takeOrder}>לקחתי הזמנה</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default DeliverOrder;