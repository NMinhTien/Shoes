import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

class Inform extends Component {
  static contextType = MyContext;

  state = {
    isDrawerOpen: false,
    drawerWidth: 300, // Chiều rộng mặc định của Drawer
  };

  toggleDrawer = () => {
    this.setState((prevState) => ({
      isDrawerOpen: !prevState.isDrawerOpen,
      drawerWidth: prevState.isDrawerOpen ? 2000 : 2000, // Cập nhật chiều rộng của Drawer
    }));
  };

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }

  render() {
    const { isDrawerOpen, drawerWidth } = this.state;

    return (
      <div className="border-bottom">
        <div className="float-left">
          {this.context.token === '' ? (
            <div>
              <Link to="/login">Login</Link> | <Link to="/signup">Sign-up</Link> | <Link to="/active">Active</Link>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>
                  Hello <b onClick={this.toggleDrawer} style={{ cursor: 'pointer' }}>
                    {this.context.customer.name}
                  </b>
                </span>
              </div>
              <Drawer anchor="right" open={isDrawerOpen} onClose={this.toggleDrawer} width={drawerWidth}>
                <List>
                  <ListItem button component={Link} to="/myprofile" onClick={this.toggleDrawer}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </ListItem>
                  <ListItem button component={Link} to="/myorders" onClick={this.toggleDrawer}>
                    <ListItemIcon>
                      <ShoppingBagIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Orders" />
                  </ListItem>
                  <ListItem button onClick={() => { this.lnkLogoutClick(); this.toggleDrawer(); }}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Drawer>
            </div>
          )}
        </div>
        <div className="float-right">
          <Link to="/mycart">
            <ShoppingCartIcon style={{ marginRight: '5px' }} />
          </Link>{' '}
          have <b>{this.context.mycart.length}</b> items
        </div>
        <div className="float-clear" />
      </div>
    );
  }
}

export default Inform;