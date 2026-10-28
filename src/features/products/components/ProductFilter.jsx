import styles from "./ProductFilter.module.css";

function ProductFilter({
  selectedCategory,
  maxPrice,
  categories,
  onCategoryChange,
  onPriceChange,
}) {
  return (
    <div className={styles.filter}>
      <div className={styles.category}>
        <label htmlFor="category">Category</label>

        <select
          id="category"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.price}>
        <label htmlFor="price">Maximum Price</label>

        <select
          id="price"
          value={maxPrice}
          onChange={(event) => onPriceChange(Number(event.target.value))}
        >
          <option value={100000}>All Prices</option>
          <option value={1000}>Under ₹1,000</option>
          <option value={5000}>Under ₹5,000</option>
          <option value={10000}>Under ₹10,000</option>
          <option value={25000}>Under ₹25,000</option>
          <option value={50000}>Under ₹50,000</option>
          <option value={100000}>Under ₹1,00,000</option>
        </select>
      </div>
    </div>
  );
}

export default ProductFilter;