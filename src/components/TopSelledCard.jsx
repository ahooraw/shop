import React from "react";

const TopSelledCard = ({ product }) => {
  return (
    <div className="top-selled-card">
      <img src={product.images[0]} alt={product.name} className="top-product-image" />
      <div className="top-product-details">
        <h4 className="top-product-name">{product.name}</h4>
        <p className="top-product-price">
          <span className="top-current-price">${product.price}</span>
          {product.oldPrice && (
            <span className="top-old-price">${product.oldPrice}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default TopSelledCard;
