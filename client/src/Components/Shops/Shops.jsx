import React from 'react';
import {
    AppBar, Box, Toolbar, Typography,
    IconButton, Tooltip, Container, Paper
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt'; // כל ההזמנות
import ReportIcon from '@mui/icons-material/Report'; // דוחות משלוחנים
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // הזמנות שלא נלקחו
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';

const Shops = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // שליפת שם החנות מה־Redux
    const shopName = useSelector((state) => state.auth.user.name);

    const isHome = location.pathname === '/Shop';

    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
            {/* סרגל עליון */}
            <AppBar position="sticky" elevation={1} sx={{ bgcolor: '#2e7d32', color: '#fff', px: 3 }}>
                <Toolbar disableGutters>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        {shopName ? `🍃 ${shopName}` : 'רשת החנויות 🍃'}
                    </Typography>

                    <Tooltip title="דף הבית">
                        <IconButton onClick={() => navigate('/Shop')} sx={{ color: '#fff', mx: 1 }}>
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="כל ההזמנות">
                        <IconButton onClick={() => navigate('/Shop/ShopOrders')} sx={{ color: '#fff', mx: 1 }}>
                            <ListAltIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="דוחות משלוחנים">
                        <IconButton onClick={() => navigate('/Shop/Reports')} sx={{ color: '#fff', mx: 1 }}>
                            <ReportIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="הזמנות ממתינות">
                        <IconButton onClick={() => navigate('/Shop/UnclaimedOrders')} sx={{ color: '#fff', mx: 1 }}>
                            <AccessTimeIcon />
                        </IconButton>
                    </Tooltip>
                     <Tooltip title="התנתק" arrow>
                            <IconButton
                                onClick={() => navigate('/LogOut')}
                                sx={{
                                    color: '#fff',
                                    transition: 'background 0.2s',
                                    '&:hover': { bgcolor: '#ef5350aa' }
                                }}
                            >
                                <LogoutIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                </Toolbar>
            </AppBar>

            {/* תוכן ראשי */}
            <Container maxWidth="md" sx={{ mt: 6 }}>
                {isHome ? (
                    <Paper elevation={2} sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#2e7d32' }}>
                            ברוכה הבאה לרשת החנויות שלנו
                        </Typography>

                        {/* הצגת שם החנות בברכה */}
                        {shopName && (
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                שלום, {shopName}
                            </Typography>
                        )}

                        <Typography variant="body1" sx={{ color: '#555' }}>
                            כאן תוכלי לצפות בכל ההזמנות, לעקוב אחרי הדוחות של השליחים,
                            ולבדוק אילו הזמנות עדיין ממתינות לאיסוף.
                        </Typography>
                    </Paper>
                ) : (
                    <Outlet />
                )}
            </Container>
        </Box>
    );
};

export default Shops;
