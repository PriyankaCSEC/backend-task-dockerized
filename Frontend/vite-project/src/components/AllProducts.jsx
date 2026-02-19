import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.css";



function AllProducts() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const PRODUCTS_PER_PAGE = 8;

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/allproducts?page=${pageNumber}&limit=${PRODUCTS_PER_PAGE}`
      );

      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <div className="products-section">
      <h2 className="section-title">All Products</h2>

      {loading && <div className="status">Loading...</div>}

      <div className="products-grid">
        {products.map((p) => (
          <div className="product-card" key={p.pd_id}>
            <div className="card-title">{p.pd_name}</div>
            <div className="card-desc">{p.pd_description}</div>
            <div className="price">₹ {parseFloat(p.pd_price).toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
