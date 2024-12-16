import React, { useState, useEffect } from "react";
import './cardsContainer.css'
import ProductCard from "../productCard/productCard";

 const CardsContainer = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch("https://kaaryar-ecom.liara.run/v1/products");
          if (!response.ok) throw new Error("Failed to fetch products");
          const data = await response.json();
          console.log(data); // بررسی ساختار داده
          setProducts(data.products || []); // تنظیم آرایه محصولات
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    if (!Array.isArray(products) || products.length === 0) {
      return <p>No products available</p>;
    }
  
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            price={product.price}
            description={product.description}
            imageUrl={product.images[0] || "https://via.placeholder.com/100"}
          />
        ))}
      </div>
    );
  };


  export default CardsContainer