import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grow from '@mui/material/Grow';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      checked: false // Initial state of the transition
    };
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }

    // Trigger the transition after a short delay
    setTimeout(() => {
      this.setState({ checked: true });
    }, 500); // Adjust the delay as needed
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  render() {
    const prods = this.state.products.map((item) => {
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

    return (
      <div className="text-center">
        <h2 className="text-center">LIST PRODUCTS</h2>
        {prods}
      </div>
    );
  }

  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}

export default withRouter(Product);