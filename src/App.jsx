import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import FilterForm from './components/FilterForm';
import TopSelled from './components/Top-selled';
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

        // console.log('Status:', response.status);
        const rawResponse = await response.text();

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${rawResponse}`);
        }

        try {
          const data = JSON.parse(rawResponse);
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
        let url = `https://kaaryar-ecom.liara.run/v1/products?page=${currentPage}&limit=10`
        if (selectedCategory.length > 0) {
          console.log(selectedCategory)
          url = `https://kaaryar-ecom.liara.run/v1/products?category=${selectedCategory[0]._id}&page=${currentPage}&limit=10`
        }
        const response = await fetch(
          url
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to load products`);
        }

        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(data.pagination.totalPages || 1);
      } catch (error) {
        console.error('Error fetching products:', error.message);
        setProducts([]); 
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, currentPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="app">
      <Header searchQuery={searchQuery} onSearch={handleSearch} />

      {error && <p className="error-message">{error}</p>}

      <div className="content">
        <FilterForm categories={categories} selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />
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
