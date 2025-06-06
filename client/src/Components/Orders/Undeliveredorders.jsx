import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import OrderCard from './OrderCard';

const Undeliveredorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const shopName = useSelector(state => state.auth.user?.name);
  const accessToken = useSelector(state => state.auth.accessToken);

  const fetchUnclaimedOrders = async () => {
    if (!shopName || !accessToken) return;
    setLoading(true);
    try {
      const url = `http://localhost:1700/api/order/shopname/${shopName}?onlyUnclaimed=true`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setOrders(data);
    } catch (err) {
      console.error('שגיאה בטעינת הזמנות שלא נלקחו', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnclaimedOrders();
  }, [shopName, accessToken]);

  return (
    <Box sx={{ padding: 4, backgroundColor: '#fffde7', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        הזמנות שלא נלקחו מעל 10 דקות
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : orders.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          אין הזמנות ממתינות להצגה
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Undeliveredorders;