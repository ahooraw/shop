import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products = [] }) {
    if (products.length === 0) {
      return <p className="no-products">No products found.</p>;
    }
  
    return (
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  }

export default ProductList;
