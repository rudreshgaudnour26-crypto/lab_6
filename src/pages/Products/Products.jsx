import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../../features/products/components/ProductGrid";
import ProductFilter from "../../features/products/components/ProductFilter";
import products from "../../features/products/data/products";
import styles from "./Products.module.css";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");
  const searchFromUrl = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl || "all"
  );
  const [maxPrice, setMaxPrice] = useState(100000);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 15;

  // Get all unique categories
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Update category when URL changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("all");
    }

    setCurrentPage(1);
  }, [categoryFromUrl, searchFromUrl]);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const categoryMatches =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const priceMatches = product.price <= maxPrice;

    const searchMatches =
      searchFromUrl === "" ||
      product.name
        .toLowerCase()
        .includes(searchFromUrl.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(searchFromUrl.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchFromUrl.toLowerCase());

    return (
      categoryMatches &&
      priceMatches &&
      searchMatches
    );
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    endIndex
  );

  // Category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    if (category === "all") {
      if (searchFromUrl) {
        setSearchParams({ search: searchFromUrl });
      } else {
        setSearchParams({});
      }
    } else {
      if (searchFromUrl) {
        setSearchParams({
          category,
          search: searchFromUrl,
        });
      } else {
        setSearchParams({ category });
      }
    }
  };

  // Price change
  const handlePriceChange = (price) => {
    setMaxPrice(price);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Products</h1>

      {searchFromUrl && (
        <p>
          Search results for: <strong>{searchFromUrl}</strong>
        </p>
      )}

      <ProductFilter
        selectedCategory={selectedCategory}
        maxPrice={maxPrice}
        categories={categories}
        onCategoryChange={handleCategoryChange}
        onPriceChange={handlePriceChange}
      />

      <ProductGrid products={currentProducts} />

      {filteredProducts.length === 0 && (
        <p>No products found.</p>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index + 1}
                type="button"
                className={
                  currentPage === index + 1
                    ? styles.activePage
                    : ""
                }
                onClick={() =>
                  setCurrentPage(index + 1)
                }
              >
                {index + 1}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;