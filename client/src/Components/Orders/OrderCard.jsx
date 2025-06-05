import React, { useState } from 'react';
import {
  Card, CardContent, CardMedia, CardActions, Avatar, IconButton,
  Typography, Box
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
}));

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        boxShadow: 6,
        borderRadius: 4,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 10,
        },
        position: 'relative'
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
        {order.ordername?.charAt(0)}
      </Avatar>

      {order.imageUrl?.trim() && (
        <CardMedia
          component="img"
          height="200"
          image={order.imageUrl}
          alt={order.ordername}
          sx={{ objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
        />
      )}

      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          {order.ordername}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, textAlign: 'center' }}
        >
          {order.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: 'space-between', px: 2 }}>
        <Box>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ color: '#E57373' }} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon sx={{ color: '#64B5F6' }} />
          </IconButton>
        </Box>

        <ExpandMore
          expand={expanded ? 1 : 0}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
};

export default OrderCard;
