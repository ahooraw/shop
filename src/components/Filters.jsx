import React from 'react';

function Filters({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="filters">
      <h4>Filter by Category</h4>
      <select
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
