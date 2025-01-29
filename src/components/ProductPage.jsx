import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductPageStyle.css";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://kaaryar-ecom.liara.run/v1/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-Page">
      <div className="product-main-container">
        <div className="product-page-images">
          <img src={product.images[0]} alt={product.name} className="main-page-image" />
          <div className="image-page-thumbnails">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={`Thumbnail ${index}`} className="thumbnail" />
            ))}
          </div>
        </div>

        <div className="product-page-info">
          <h1>{product.name}</h1>
          <p className="price-pp">${product.price}</p>
          <p className="stock-pp">{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
          <p className="description-pp">{product.description}</p>

          <div className="rating-pp">
            <span>{product.rating} stars</span> ({product.ratingCount} reviews)
          </div>

          <button className="add-to-cart-pp">Add to Cart</button>
        </div>
      </div>

      <div className="related-products">
        <h2>Related Products</h2>
        <div className="products-pp">
          <div className="product-page-card">Static Product 1</div>
          <div className="product-page-card">Static Product 2</div>
          <div className="product-page-card">Static Product 3</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;