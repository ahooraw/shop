import React from 'react';
import './product.css';

const ProductCard = () => {
  return (
    <div className="product-card">
      <img src="https://via.placeholder.com/250x150" alt="Product" />
      <div className="product-category">CATEGORY</div>
      <div className="product-name">PRODUCT NAME GOES HERE</div>
      <div className="product-price">
        $980.00 <span className="product-old-price">$990.00</span>
      </div>
      <div className="rating">★★★★☆</div>
      <div className="icon-container">
        <span className="icon">🔄</span>
        <span className="icon">👁️</span>
      </div>
    </div>
  );
};

export default ProductCard;