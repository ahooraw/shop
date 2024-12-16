import React from "react";
import './product.css'

const ProductCard = ({ name, price, description, imageUrl }) => {
  return (
    <div className="card-container">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <strong>${price}</strong>
    </div>
  );
};


export default ProductCard;