import axios from 'axios';
import React, { useContext, useState } from 'react';
import MyContext from '../contexts/MyContext';
import { Grid, Paper, Box, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const Login = () => {
  const { token, setToken, setUsername } = useContext(MyContext);
  const [txtUsername, setTxtUsername] = useState('');
  const [txtPassword, setTxtPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (txtUsername && txtPassword) {
      const account = { username: txtUsername, password: txtPassword };
      apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  };

  const apiLogin = (account) => {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        setToken(result.token);
        setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  };

  if (token === '') {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <LockOutlinedIcon sx={{ m: 1, bgcolor: 'secondary.main' }} />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={txtUsername}
                  onChange={(e) => setTxtUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={txtPassword}
                  onChange={(e) => setTxtPassword(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }

  return <div />;
};

export default Login;