import React, { useState, useEffect } from "react";
import axios from "axios";
import TopSelledCard from "./TopSelledCard";

const TopSelled = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://kaaryar-ecom.liara.run/v1/products/top-rated");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="top-selling">
      <h3>Top Selling</h3>
      {products.map((product) => (
        <TopSelledCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default TopSelled;
