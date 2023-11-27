import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MyContext from '../contexts/MyContext';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function MenuComponent() {
  const context = useContext(MyContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const lnkLogoutClick = () => {
    context.setToken('');
    context.setUsername('');
  };

  const handleMenuToggle = (event) => {
    setIsMenuOpen(!isMenuOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: '5px' }}
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="custom-logo">
            LOGO
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '20px', // Đặt khoảng cách 20px từ logo
            }}
          >
            <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, margin: '0 -5px' }}>
              <Grid item sx={{ margin: '0 auto' }}> {/* Căn giữa nút Home */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/home"
                  className="menu-button"
                  sx={{ marginRight: '5px' }}
                >
                  Home
                </Button>
              </Grid>
              <Grid item sx={{ margin: '0 auto' }}> {/* Căn giữa nút Product */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/product"
                  className="menu-button"
                  sx={{ marginRight: '5px' }}
                >
                  Product
                </Button>
              </Grid>
              <Grid item sx={{ margin: '0 auto' }}> {/* Căn giữa nút Customer */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/customer"
                  className="menu-button"
                  sx={{ marginRight: '5px' }}
                >
                  Customer
                </Button>
              </Grid>
              <Grid item sx={{ margin: '0 auto' }}> {/* Căn giữa nút Category */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/category"
                  className="menu-button"
                  sx={{ marginRight: '5px' }}
                >
                  Category
                </Button>
              </Grid>
              <Grid item sx={{ margin: '0 auto' }}> {/* Căn giữa nút Order */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/order"
                  className="menu-button"
                  sx={{ marginRight: '5px' }}
                >
                  Order
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1 }} /> {/* Đẩy các phần tử sau logo về bên phải */}
          <Button
            onClick={lnkLogoutClick}
            color="inherit"
            component={Link}
            to="/admin/home"
            className="custom-logout-button"
          >
            Logout
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem component={Link} to="/admin/home" onClick={handleMenuClose}>
              Home
            </MenuItem>
           <MenuItem component={Link} to="/admin/product" onClick={handleMenuClose}>
              Product
            </MenuItem>
            <MenuItem component={Link} to="/admin/customer" onClick={handleMenuClose}>
              Customer
            </MenuItem>
            <MenuItem component={Link} to="/admin/category" onClick={handleMenuClose}>
              Category
            </MenuItem>
            <MenuItem component={Link} to="/admin/order" onClick={handleMenuClose}>
              Order
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Thêm một toolbar giả để đẩy nội dung xuống dưới menu */}
    </div>
  );
}

export default MenuComponent;