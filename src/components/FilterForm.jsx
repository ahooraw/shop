import React, { useState } from "react";
import TopSelled from './Top-selled';

const FilterForm = ({ categories, selectedCategory, onSelectCategory }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([334, 884]);

  const brands = ["SAMSUNG", "LG", "SONY"];
  const toggleCategory = (category) => {
    onSelectCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  return (
    <div className="filter-form">
      <div className="filter-section">
        <h3>دسته‌بندی‌ها</h3>
        {categories.map((category) => (
          <div>
            <label id={category._id} key={category._id}>
            <input
              id={category._id}
              type="checkbox"
              checked={selectedCategory.includes(category.name)}
              onChange={() => toggleCategory(category)}
            />
            {category.name}
          </label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>قیمت</h3>
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => handlePriceChange(0, Number(e.target.value))}
        />
        <span> - </span>
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => handlePriceChange(1, Number(e.target.value))}
        />
      </div>

      <div className="filter-section">
        <h3>برند</h3>
        {brands.map((brand) => (
          <div>
            <label key={brand}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
            />
            {brand}
          </label>
          </div>
        ))}
      </div>
      {/* <TopSelled /> */}
    </div>
  );
};

export default FilterForm;
