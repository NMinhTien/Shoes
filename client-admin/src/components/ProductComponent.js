import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

class Product extends Component {
  static contextType = MyContext;
  
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });

    return (
      <div>
        <div className="float-left">
          <h2 className="text-center">PRODUCT LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
              {prods}
            </tbody>
          </table>
          <div className="pagination">
            <Stack spacing={2}>
              <Pagination
                count={this.state.noPages}
                page={this.state.curPage}
                onChange={(_, page) => this.lnkPageClick(page)}
                renderItem={(item) => (
                  <PaginationItem
                    component="span"
                    {...item}
                    icon={item.type === 'previous' ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                  />
                )}
              />
            </Stack>
          </div>
        </div>
        <div className="inline" />

        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        <div className="float-clear" />
      </div>
    );
  }

  updateProducts = (products, noPages, curPage) => {
    this.setState({ products, noPages, curPage });
  }

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  lnkPageClick = (page) => {
    this.apiGetProducts(page);
  }

  trItemClick = (item) => {
    this.setState({ itemSelected: item });
  }

  apiGetProducts = (page) => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}

export default Product;