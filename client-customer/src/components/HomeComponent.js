import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Grow from '@mui/material/Grow'; // Import Grow from Material-UI
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      checked: false,
      slideImages: [], // Mảng chứa các ảnh cho slideshow
    };
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();

    // Trigger the transition after a short delay
    setTimeout(() => {
      this.setState({ checked: true });
    }, 500); // Adjust the delay as needed
  }

  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}>
              <Grow in={this.state.checked}>
                <div className="hovered-image">
                  <img
                    src={"data:image/jpg;base64," + item.image}
                    width="300px"
                    height="300px"
                    alt=""
                  />
                  <div className="hovered-info">
                    <p>{item.name}</p>
                    <p>Price: {item.price}</p>
                  </div>
                </div>
              </Grow>
            </Link>
          </figure>
        </div>
      );
    });
  
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}>
              <Grow in={this.state.checked}>
                <div className="hovered-image">
                  <img
                    src={"data:image/jpg;base64," + item.image}
                    width="300px"
                    height="300px"
                    alt=""
                  />
                  <div className="hovered-info">
                    <p>{item.name}</p>
                    <p>Price: {item.price}</p>
                  </div>
                </div>
              </Grow>
            </Link>
          </figure>
        </div>
      );
    });
  
    const images = [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];
  
    return (
      <div>
        <Slide>
          <div className="each-slide-effect">
            <div style={{ 'backgroundImage': `url(${images[0]})` }}>
              <img src={images[0]} className="slide-image" alt="Slide 1" />
            </div>
          </div>
          <div className="each-slide-effect">
            <div style={{ 'backgroundImage': `url(${images[1]})` }}>
              <img src={images[1]} className="slide-image" alt="Slide 2" />
            </div>
          </div>
          <div className="each-slide-effect">
            <div style={{ 'backgroundImage': `url(${images[2]})` }}>
              <img src={images[2]} className="slide-image" alt="Slide 3" />
            </div>
          </div>
        </Slide>
  
        <div className="align-center">
          <h2 className="text-center">NEW PRODUCTS</h2>
          {newprods}
        </div>
        {this.state.hotprods.length > 0 ? (
          <div className="align-center">
            <h2 className="text-center">HOT PRODUCTS</h2>
            {hotprods}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }

  // APIs
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      const slideImages = result.map((item) => item.image);
      this.setState({ newprods: result, slideImages });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}

export default Home;