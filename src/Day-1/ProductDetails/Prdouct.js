
import React, { Component } from 'react';
class ProductDetails extends Component {
    constructor(props) {
      super(props);
      this.state = {
        productName: '',
        unitPrice: '',
        quantity: '',
        totalAmount: null,
      };
    }
  
    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };
  
    calculateTotal = () => {
      const { unitPrice, quantity } = this.state;
      let totalAmount = unitPrice * quantity;
  
      // Apply 10% discount if quantity is more than 10
      if (quantity > 10) {
        totalAmount *= 0.9; // Apply a 10% discount
      }
  
      this.setState({ totalAmount });
    };
  
    render() {
      const { productName, unitPrice, quantity, totalAmount } = this.state;
  
      return (
        <div  className="container mt-5 p-3 border">
          <h2>Product Details</h2>
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={productName}
            onChange={this.handleInputChange}
          />
          <input
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            value={unitPrice}
            onChange={this.handleInputChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={quantity}
            onChange={this.handleInputChange}
          />
          <button onClick={this.calculateTotal} disabled={!quantity} >Calculate Total</button>
          {totalAmount !== null && (
            <div>
              <h3>Results</h3>
              <p>Product Name: {productName}</p>
              <p>Total Amount: {totalAmount.toFixed(2)}</p>
            </div>
          )}
        </div>
      );
    }
  }
  
  export default ProductDetails;