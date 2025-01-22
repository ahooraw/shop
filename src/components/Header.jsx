import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';

function Header({ searchQuery, onSearch }) {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null); // رفرنس برای مودال

  const handleCartClick = () => {
    const cart = JSON.parse(Cookies.get('cart') || '[]');
    setCartItems(cart);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // بستن مودال با کلیک بیرون آن
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <header className="header">
      <h1>My Store</h1>
      <h2>
        <svg
          className="shop-icon"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#434343"
          onClick={handleCartClick}
          style={{ cursor: 'pointer' }}
        >
          <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
        </svg>
      </h2>
      <SearchBar searchQuery={searchQuery} onSearch={onSearch} />

      {isModalOpen && (
        <div className="cart-modal-overlay">
          <div className="cart-modal" ref={modalRef}>
            <button className="close-modal" onClick={closeModal}>
              بستن
            </button>
            <h3>سبد خرید</h3>
            <div className="cart-items">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <ProductCard key={index} product={item} />
                ))
              ) : (
                <p>سبد خرید خالی است.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
