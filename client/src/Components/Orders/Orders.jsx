
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import AddOrder from '../Orders/AddOrder';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:1700/api/order');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    transform: 'rotate(0deg)',
    ...(expanded && {
      transform: 'rotate(180deg)',
    }),
  }));

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#f5f5f5',
      }}
    >
      {orders.map((order, index) => (
        <Card
          key={index}
          sx={{
            width: 400,
            position: 'relative',
            margin: 2,
            boxShadow: 4,
            borderRadius: 3,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.08)',
              boxShadow: 8,
            },
          }}
        >
          <Avatar
            sx={{
              bgcolor: red[500],
              position: 'absolute',
              top: 16,
              left: 16,
              width: 48,
              height: 48,
              fontSize: 20,
              zIndex: 1,
            }}
          >
            {order.ordername.charAt(0)}
          </Avatar>
  
          <CardMedia
            component="img"
            height="200" 
            image={order.imageUrl}
            alt={order.ordername}
            sx={{
              objectFit: 'cover',
              borderRadius: '4px 4px 0 0',
              width: '100%', 
            }}
          />
  
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              {order.ordername}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ marginTop: 2, textAlign: 'center' }}
            >
              {order.description}
            </Typography>
          </CardContent>
  
          <CardActions disableSpacing sx={{ justifyContent: 'space-between', padding: '0 16px' }}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon sx={{ color: '#E57373' }} />
              <ShareIcon sx={{ color: '#64B5F6' }} />
            </IconButton>
  
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </Card>
      ))}
  
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Button
          sx={{
            backgroundColor: '#1E88E5',
            color: 'white',
            borderRadius: '50%',
            minWidth: '64px',
            minHeight: '64px',
            boxShadow: 4,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              backgroundColor: 'white',
              color: '#1E88E5',
              boxShadow: 6,
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => setShow(true)}
        >
          <AddIcon sx={{ fontSize: 28 }} />
        </Button>
      </Box>

      
      <AddOrder show={show} setShow={setShow} fetchOrders={fetchOrders} />
    </div>
  );
};

export default Orders;