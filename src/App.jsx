import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [error, setError] = useState(null); 



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://kaaryar-ecom.liara.run/v1/categories'
        );

        console.log('Status:', response.status);
        const rawResponse = await response.text();

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${rawResponse}`);
        }

        try {
          const data = JSON.parse(rawResponse);
          console.log('Parsed JSON:', data);
          setCategories(data);
        } catch (err) {
          console.error('Not a valid JSON response:', rawResponse);
          setCategories([]); 
          setError('Failed to parse categories. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching categories:', error.message);
        setCategories([]); 
        setError('Failed to load categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams({
          category: selectedCategory,
          q: searchQuery,
          page: currentPage,
          limit: 10,
        }).toString();

        const response = await fetch(
          `https://kaaryar-ecom.liara.run/v1/products`
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to load products`);
        }

        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching products:', error.message);
        setProducts([]); 
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, currentPage]);

  // تغییر دسته‌بندی انتخاب‌شده
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // تغییر مقدار جستجو
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // تغییر صفحه
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <Header searchQuery={searchQuery} onSearch={handleSearch} />

      {error && <p className="error-message">{error}</p>}

      <div className="content">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />
        <ProductList products={products} />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
