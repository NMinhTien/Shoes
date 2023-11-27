import React, { Component } from 'react';
import axios from 'axios';
import { Magnifier } from '@niklasmaki/react-image-magnifiers';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import Button from '@mui/material/Button';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }

  btnAdd2CartClick = (e) => {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex((x) => x.product._id === product._id);
      if (index === -1) {
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('OK BABY!');
    } else {
      alert('Please input quantity');
    }
  };

  render() {
    const prod = this.state.product;
    const txtQuantity = this.state.txtQuantity;

    if (prod) {
      const imageSrc = "data:image/jpg;base64," + prod.image;
      const imageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
      };

      return (
        <div className="align-center">
          <h2 className="text-center">PRODUCT DETAILS</h2>
          <figure className="caption-right">
            <div style={{ maxWidth: '500px', maxHeight: '500px' }}>
              <Magnifier
                imageSrc={imageSrc}
                imageAlt=""
                style={imageStyle}
                zoomFactor={1.5}
                zoomContainerClassName="zoom-container"
              />
            </div>
            <figcaption>
              <form>
                <table>
                  <tbody>
                    <tr>
                      <td align="right">ID:</td>
                      <td>{prod._id}</td>
                    </tr>
                    <tr>
                      <td align="right">Name:</td>
                      <td>{prod.name}</td>
                    </tr>
                    <tr>
                      <td align="right">Price:</td>
                      <td>{prod.price}</td>
                    </tr>
                    <tr>
                      <td align="right">Category:</td>
                      <td>{prod.category.name}</td>
                    </tr>
                    <tr>
                      <td align="right">Quantity:</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={txtQuantity}
                          onChange={(e) => {
                            this.setState({ txtQuantity: e.target.value });
                          }}
                        />
                        
                  
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
  <Button variant="contained" onClick={this.btnAdd2CartClick}>
    ADD TO CART
  </Button>
</td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure>
        </div>
      );
    }

    return <div />;
  }
}

export default withRouter(ProductDetail);