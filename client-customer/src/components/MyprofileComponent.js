import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import Avatar from '@mui/material/Avatar';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
class MyProfile extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
      avatarSrc: localStorage.getItem('avatarSrc') || '/static/images/default-avatar.jpg',
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email,
      });
    }
  }

  componentWillUnmount() {
    localStorage.setItem('avatarSrc', this.state.avatarSrc);
  }

  handleAvatarChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      this.setState({ avatarSrc: event.target.result });
    };

    reader.readAsDataURL(file);
  };

  render() {
    if (this.context.token === '') return <Navigate replace to="/login" />;
    return (
      <div className="align-center">
        <h2 className="text-center">MY PROFILE</h2>
        <Dropzone onDrop={this.handleAvatarChange} accept="image/*" multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <Avatar alt="Avatar" src={this.state.avatarSrc} sx={{ width: 56, height: 56, margin: 'auto' }} />
              <p>Drag and drop an image here, or click to select an image</p>
            </div>
          )}
        </Dropzone>
        <form>
  <table className="align-center">
    <tbody>
      <tr>
        <td>Username</td>
        <td>
          <TextField
            type="text"
            value={this.state.txtUsername}
            onChange={(e) => {
              this.setState({ txtUsername: e.target.value });
            }}
          />
        </td>
      </tr>
      <tr>
        <td>Password</td>
        <td>
          <TextField
            type="password"
            value={this.state.txtPassword}
            onChange={(e) => {
              this.setState({ txtPassword: e.target.value });
            }}
          />
        </td>
      </tr>
      <tr>
        <td>Name</td>
        <td>
          <TextField
            type="text"
            value={this.state.txtName}
            onChange={(e) => {
              this.setState({ txtName: e.target.value });
            }}
          />
        </td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>
          <TextField
            type="tel"
            value={this.state.txtPhone}
            onChange={(e) => {
              this.setState({ txtPhone: e.target.value });
            }}
          />
        </td>
      </tr>
      <tr>
        <td>Email</td>
        <td>
          <TextField
            type="email"
            value={this.state.txtEmail}
            onChange={(e) => {
              this.setState({ txtEmail: e.target.value });
            }}
          />
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
        <Button
  variant="contained"
  color="primary"
  onClick={(e) => this.btnUpdateClick(e)}
  style={{ width: '200px' }}
>
  UPDATE
</Button>
        </td>
      </tr>
    </tbody>
  </table>
</form>
      </div>
    );
  }

  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }

  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        
      
        alert('OK BABY!');
        this.context.setCustomer(result);
      }
    });
  }
}

export default MyProfile;