import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ user, setSearchResults, setSelectedCat, setParentSearchQuery }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Try category endpoint first
      try {
        const catRes = await axios.get(
          `http://localhost:5000/api/category/${encodeURIComponent(
            searchQuery
          )}?page=1&perPage=50`
        );

        // If category found, use its products
        setSearchResults(catRes.data.products || []);
        setSelectedCat(catRes.data.category || null);
        return;
      } catch (catErr) {
        // If category not found (404) or other error, fall back to product-name search
        if (!catErr.response || catErr.response.status !== 404) {
          // Log non-404 errors but still attempt product search
          console.debug("Category lookup error, falling back to product search:", catErr.message);
        }
      }

    // ElasticSearch route
    const esRes = await axios.get(
      `http://localhost:5000/api/products/search-es`,
      {
        params: {
          q: searchQuery,
          page: 1,       // can be dynamic later
          perPage: 10,   // match your frontend pagination
          // minPrice, maxPrice // optional: if you want numeric filters
        },
      }
    );

    setSearchResults(esRes.data.products || []);
    setSelectedCat(null);
    console.log(
      `SEARCH QUERY: ${searchQuery}`,
      "RESULT COUNT:",
      esRes.data.total,
      "ROWS:",
      esRes.data.products.map((p) => p.pd_name)
    );

  } catch (err) {
    console.error("Search failed:", err);
  } finally {
    setIsSearching(false);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav className="nav">
      <div className="nav-left" onClick={() => navigate("/")}>
        ECom
      </div>

      <div className="nav-center">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (typeof setParentSearchQuery === "function") setParentSearchQuery(e.target.value);
            if (e.target.value === "") {
              setSearchResults([]);
              setSelectedCat(null);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>

      <div className="nav-right">
        <button
          className="all-products-btn"
          onClick={() => navigate("/allproducts")}
        >
          All Products
        </button>

        {user && <span className="nav-link">Hi, {user.name}</span>}

        <button className="nav-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
