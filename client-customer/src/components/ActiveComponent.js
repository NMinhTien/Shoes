import axios from 'axios';
import React, { Component } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: '',
      isActivated: false,

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
            <Typography component="h1" variant="h5">
              ACTIVE ACCOUNT
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
                autoComplete="id"
                autoFocus
                value={this.state.txtID}
                onChange={(e) => {
                  this.setState({ txtID: e.target.value });
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="token"
                label="Token"
                type="text"
                id="token"
                autoComplete="token"
                value={this.state.txtToken}
                onChange={(e) => {
                  this.setState({ txtToken: e.target.value });
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => this.btnActiveClick(e)}
              >
                ACTIVE
              </Button>
              <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Kiểm tra nếu đã active thành công thì hiển thị thông báo */}
        {this.state.isActivated && (
          <Alert severity="success">Your account has been successfully activated. Now you can login.</Alert>
        )}
        {/* ... */}
      </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }

  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        // Cập nhật trạng thái active thành công
        this.setState({ isActivated: true });
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default Active;