import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  //search
  // const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);
  const PAGES_PER_GROUP = 4;
  const PRODUCTS_PER_PAGE = 8;

  //restore user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/signin");
      return;
    }

    setUser(JSON.parse(storedUser));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [navigate]);


  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/allproducts?page=${pageNumber}&limit=${PRODUCTS_PER_PAGE}`
      );

      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  const currentGroup = Math.ceil(page / PAGES_PER_GROUP);

  const startPage = (currentGroup - 1) * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="home-root">

      {/* ===== NAVBAR (Same as Home) ===== */}
      <Navbar
        user={user}
        setSearchResults={setSearchResults}
        setSelectedCat={() => { }}
      />


      {/* ===== LAYOUT WRAPPER ===== */}
      <div className="layout">

        {/* Empty sidebar (to preserve layout alignment) */}
        {/* <aside className="sidebar"></aside> */}

        {/* Content Area */}
        <div className="content">
          <div className="products-section">

            <h2 className="section-title">All Products</h2>

            {loading && <div className="status">Loading...</div>}

            <div className="products-grid">
              {products.map((p) => (
                <div className="product-card" key={p.pd_id}>
                  <div className="card-title">{p.pd_name}</div>
                  <div className="card-desc">{p.pd_description}</div>
                  <div className="price">
                    $ {parseFloat(p.pd_price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              {/* Previous Group */}
              <button
                onClick={() => setPage(startPage - 1)}
                disabled={startPage === 1}
              >
                «
              </button>

              {/* Page Numbers */}
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  className={page === num ? "active" : ""}
                  onClick={() => setPage(num)}
                >
                  {num}
                </button>
              ))}

              {/* Next Group */}
              <button
                onClick={() => setPage(endPage + 1)}
                disabled={endPage === totalPages}
              >
                »
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
