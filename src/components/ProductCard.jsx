import React from 'react';
// import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.name} className="product-image" />
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <p className='product-disc'>{product.description}</p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
