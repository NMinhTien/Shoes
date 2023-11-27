import axios from 'axios';
import React, { Component } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
      successMessage: ''
    };
  }

  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={this.state.txtUsername}
                    onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    value={this.state.txtPassword}
                    onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    value={this.state.txtName}
                    onChange={(e) => { this.setState({ txtName: e.target.value }) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="tel"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    value={this.state.txtPhone}
                    onChange={(e) => { this.setState({ txtPhone: e.target.value }) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={this.state.txtEmail}
                    onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => this.btnSignupClick(e)}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to="/login" variant="body2">
                    Already have an account? Sign in
                  </RouterLink>
                </Grid>
              </Grid>
              {this.state.successMessage && (
                <Alert severity="success" sx={{ mt: 3 }}>
                  {this.state.successMessage}
                </Alert>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }

  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
      if (result.success) {
        this.setState({
txtUsername: '',
          txtPassword: '',
          txtName: '',
          txtPhone: '',
          txtEmail: '',
          successMessage: 'Your account has been successfully created. Please activate your account.'
        });
      }
    });
  }
}

export default Signup;