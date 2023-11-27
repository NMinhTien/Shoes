import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
      isMobileMenuOpen: false,
    };
  }

  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  closeMobileMenu = () => {
    this.setState({ isMobileMenuOpen: false });
  };

  renderCategories = () => {
    const { categories, isMobileMenuOpen } = this.state;

    if (isMobileMenuOpen) {
      return (
        <Drawer
          anchor="left"
          open={isMobileMenuOpen}
          onClose={this.closeMobileMenu}
        >
          <List>
            {categories.map((item) => (
              <ListItem
                key={item._id}
                button
                component={Link}
                to={'/product/category/' + item._id}
                onClick={this.closeMobileMenu}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
      );
    } else {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '@media (max-width: 600px)': {
              display: 'none',
            },
          }}
        >
          <List
            sx={{
              display: 'flex',
              gap: '10px',
              listStyle: 'none',
              marginLeft: 'auto, -10px',
            }}
          >
            {categories.map((item) => (
              <ListItem
                key={item._id}
                button
                component={Link}
                to={'/product/category/' + item._id}
                onClick={this.closeMobileMenu}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      );
    }
  };

  render() {
    const { isMobileMenuOpen } = this.state;

    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ marginRight: 2 }}
              onClick={this.toggleMobileMenu}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                marginRight: 2,
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            {this.renderCategories()}

            <InputBase
              placeholder="Enter keyword"
              className="keyword"
              value={this.state.txtKeyword}
              onChange={(e) => {
                this.setState({ txtKeyword: e.target.value });
              }}
              sx={{
                color: 'inherit',
                padding: '8px',
                transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                width: '120px',
                '&:focus': {
                  width: '200px',
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={(e) => this.btnSearchClick(e)}
              sx={{ marginLeft: '20px' }}
            >
              SEARCH
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () =>{
    const isMobile = window.innerWidth <= 600;
    if (!isMobile && this.state.isMobileMenuOpen) {
      this.setState({ isMobileMenuOpen: false });
    }
  };

  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default withRouter(Menu);