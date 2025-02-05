import { Outlet, Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";

function Layout({ searchQuery, onSearch }) {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMobileSearchOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCartClick = () => {
    const cart = JSON.parse(Cookies.get("cart") || "[]");
    setCartItems(cart);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className="layout-container">
      <header className="header">
        <div className="shop-link-header">
          <Link className="link-style-main" to="/">
            <h1>My Store</h1>
          </Link>
        </div>

        {!isMobile ? (
          <SearchBar searchQuery={searchQuery} onSearch={onSearch} />
        ) : (
          <span
            className="material-icons search-icon"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            search
          </span>
        )}

        <div className="icon-container">
          <div className="shop-icon-container">
            <svg
              className="shop-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#434343"
              onClick={handleCartClick}
              style={{ cursor: "pointer" }}
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>
          </div>

          <div
            className="menu-icon-container"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <span
              className="material-symbols-outlined menu-icon"
              style={{
                transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            >
              stat_minus_3
            </span>
            {menuOpen && (
              <div className="dropdown-menu">
                <Link to="/support" className="menu-item">
                  پشتیبانی
                </Link>
                <Link to="/login" className="menu-item">
                  ورود
                </Link>
              </div>
            )}
          </div>
        </div>

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

      {isMobileSearchOpen && (
        <div className="mobile-search-container active">
          <SearchBar
            searchQuery={searchQuery}
            onSearch={onSearch}
            className="mobile-searchbar"
          />
        </div>
      )}

      <Outlet />
      <footer className="footer-container"></footer>
    </div>
  );
}

export default Layout;
