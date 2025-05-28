// client/src/Components/Delivers/DeliverActiveOrder.jsx

import React, { useEffect, useState, useRef } from 'react'; // ייבוא useRef
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setDeliverActiveStatus } from '../../redux/tokenSlice'; // וודאי שהנתיב נכון
import {
  Card, CardContent, Typography, Button, Box, CircularProgress, Alert
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // לאיקון של שעון

const DeliverActiveOrder = () => {
  const deliverInfo = useSelector(state => state.auth.user); // פרטי המשלוחן המלאים
  const dispatch = useDispatch();

  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timePassed, setTimePassed] = useState(0); // זמן שעבר בדקות
  const intervalRef = useRef(null); // שימוש ב-useRef לשמירת ID האינטרוול

  // פונקציה לטעינת ההזמנה הספציפית שהמשלוחן לוקח
  const fetchCurrentOrder = async () => {
    // וודא שלשליח יש ID ו-currentOrder
    if (!deliverInfo?._id || !deliverInfo?.currentOrder) {
      setLoading(false);
      setError('לשליח אין הזמנה פעילה כרגע.');
      setCurrentOrder(null);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:1700/api/order/${deliverInfo.currentOrder}`);
      setCurrentOrder(response.data);

      // הגדרת זמן התחלה לשעון
      if (response.data.pickupTime) { // אם נשמר pickupTime בהזמנה
        const pickupDate = new Date(response.data.pickupTime);
        const now = new Date();
        const minutesDiff = Math.floor((now.getTime() - pickupDate.getTime()) / (1000 * 60));
        setTimePassed(minutesDiff);
      } else {
        // אם אין pickupTime, נתחיל את השעון מ-0 (אולי צריך להוסיף pickupTime גם בעמוד זה)
        setTimePassed(0);
      }

    } catch (err) {
      console.error("Error fetching current order:", err.response ? err.response.data : err.message);
      setError('נכשלה טעינת ההזמנה הנוכחית.');
      setCurrentOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentOrder();

    // ניקוי אינטרוול קודם אם קיים
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }

    // התחלת השעון כל דקה
    intervalRef.current = setInterval(() => {
      setTimePassed(prev => prev + 1);
    }, 60 * 1000); // כל דקה

    return () => { // ניקוי האינטרוול כשקומפוננטה נעלמת
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [deliverInfo?.currentOrder]); // תלות ב-currentOrder של המשלוחן כדי לטעון מחדש

  // פונקציה לעדכון סטטוס ההזמנה ל"נמסר"
  const handleDelivered = async () => {
    if (!currentOrder || !deliverInfo?._id) return;

    try {
      // עדכון סטטוס ההזמנה
      await axios.put(`http://localhost:1700/api/order/${currentOrder._id}`, {
        status: "Delivered",
        deliveryTime: new Date().toISOString() // שמירת זמן המסירה
      });

      // עדכון סטטוס השליח ל-active: true ואיפוס currentOrder
      const updatedDeliverResponse = await axios.put(`http://localhost:1700/api/deliver/${deliverInfo._id}`, {
        active: true,
        currentOrder: null, // איפוס ההזמנה הנוכחית
      });

      // עדכון ה-Redux store באמצעות setDeliverActiveStatus
      dispatch(setDeliverActiveStatus({
          active: true,
          currentOrder: null
      }));

      alert("הזמנה נמסרה בהצלחה!");
      // אין צורך לרענן את רשימת ההזמנות כאן, כי Delivers.jsx תעבור לעמוד הפנוי
    } catch (err) {
      console.error("Error setting order as delivered:", err.response ? err.response.data : err.message);
      alert("שגיאה בעדכון סטטוס המסירה.");
    }
  };

  // פונקציה לעדכון זמן השעון (למשל, הוספת/הפחתת דקות)
  const updateDeliveryTime = async (minutesToAdd) => {
    if (!currentOrder || !deliverInfo) return;

    try {
      // נניח שיש לך שדה "estimatedDeliveryTime" בהזמנה ב-DB
      const currentEstimatedTime = currentOrder.estimatedDeliveryTime ? new Date(currentOrder.estimatedDeliveryTime) : new Date();
      currentEstimatedTime.setMinutes(currentEstimatedTime.getMinutes() + minutesToAdd);

      await axios.put(`http://localhost:1700/api/order/${currentOrder._id}`, {
        estimatedDeliveryTime: currentEstimatedTime.toISOString()
      });
      
      // אופציונלי: לרענן את ההזמנה אחרי העדכון כדי שהזמן החדש יוצג
      fetchCurrentOrder();

      alert(`זמן משוער עודכן ב-${minutesToAdd} דקות.`);

    } catch (err) {
      console.error("Error updating delivery time:", err.response ? err.response.data : err.message);
      alert("שגיאה בעדכון זמן המסירה.");
    }
  };


  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box>;
  if (!currentOrder) return <Box sx={{ mt: 4 }}><Alert severity="info">אין לך הזמנה פעילה כרגע. אם זה לא נכון, אנא התחבר מחדש.</Alert></Box>;


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        padding: 3,
        backgroundColor: '#f9f9f9',
        minHeight: '80vh',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        הזמנה נוכחית: {currentOrder.ordername}
      </Typography>

      <Card
        sx={{
          width: 500,
          boxShadow: 6,
          borderRadius: 4,
          padding: 3,
          textAlign: 'center',
        }}
      >
        <CardContent>
          <img
            src={currentOrder.imageUrl}
            alt={currentOrder.ordername}
            style={{ maxWidth: '80%', height: 'auto', borderRadius: '8px', marginBottom: '16px' }}
          />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
            {currentOrder.ordername}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {currentOrder.description}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            **כתובת:** {currentOrder.address.city}, {currentOrder.address.street}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            **סטטוס:** {currentOrder.status}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <AccessTimeIcon color="primary" />
            <Typography variant="h6">
              זמן שחלף: {timePassed} דקות
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Button variant="outlined" onClick={() => updateDeliveryTime(-5)}>הקדמתי ב-5 דקות</Button>
            <Button variant="outlined" onClick={() => updateDeliveryTime(5)}>התעכבתי ב-5 דקות</Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleDelivered}
            sx={{ mt: 2 }}
          >
            הזמנה נמסרה!
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DeliverActiveOrder;