import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function ProductCard({ product }) {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(Cookies.get('cart') || '[]');
    const exists = cart.some((item) => item._id === product._id); // بررسی وجود محصول در سبد خرید
    setIsInCart(exists);
  }, [product]);

  const handleCartAction = () => {
    const cart = JSON.parse(Cookies.get('cart') || '[]');

    if (isInCart) {
      // حذف محصول از سبد خرید
      const updatedCart = cart.filter((item) => item._id !== product._id);
      Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
      setIsInCart(false);
    } else {
      // اضافه کردن محصول به سبد خرید
      cart.push(product);
      Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
      setIsInCart(true);
    }
  };

  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.name} className="product-image" />
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <p className="product-disc">{product.description}</p>
      <button className="add-to-cart" onClick={handleCartAction}>
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductCard;
