import React from 'react';
import {
    AppBar, Box, Toolbar, Typography,
    IconButton, Tooltip, Container, Paper,
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LogoutIcon from '@mui/icons-material/Logout';

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/Admin';

    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#f9fbfc', minHeight: '100vh' }}>
            {/* Header */}
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: '#171e29',
                    color: '#fff',
                    px: 3,
                    py: 1
                }}
            >
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        sx={{ flexGrow: 1, fontWeight: 700 }}
                    >
                        מערכת ניהול
                    </Typography>

                    <Tooltip title="דף הבית">
                        <IconButton onClick={() => navigate('/Admin')} sx={{ color: '#fff', mx: 1 }}>
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="משלוחנים">
                        <IconButton onClick={() => navigate('/Admin/ListDeliver')} sx={{ color: '#fff', mx: 1 }}>
                            <DeliveryDiningIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="חנויות">
                        <IconButton onClick={() => navigate('/Admin/ListShop')} sx={{ color: '#fff', mx: 1 }}>
                            <StorefrontIcon />
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

            {/* תוכן הדף */}
            <Container maxWidth="md" sx={{ mt: 6 }}>
                {isHome ? (
                    <Paper
                        elevation={3}
                        sx={{
                            p: 5,
                            textAlign: 'center',
                            borderRadius: 4,
                            background: 'linear-gradient(to right, #e3f2fd, #ffffff)'
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#0d47a1' }}>
                            ברוכה הבאה למערכת הניהול
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, color: '#444' }}>
                            כאן תוכלי לנהל בקלות את המשלוחנים, החנויות ועוד.
                        </Typography>
                        <Box
                            component="img"
                            src="https://cdn-icons-png.flaticon.com/512/2972/2972499.png"
                            alt="dashboard"
                            sx={{
                                width: { xs: '70%', md: '300px' },
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)'
                                }
                            }}
                        />
                    </Paper>
                ) : (
                    <Outlet />
                )}
            </Container>
        </Box>
    );
};

export default Admin;
