import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function Home() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [products, setProducts] = useState([]);
	const [productsLoading, setProductsLoading] = useState(false);
	const [selectedCat, setSelectedCat] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const PRODUCTS_PER_PAGE = 5;
	// const user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	//search
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);//stores products returned from backend
	const [isSearching, setIsSearching] = useState(false);


	useEffect(() => {
  //Restore user session
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!storedUser || !token) {
    navigate("/signin");
    return;
  }
  setUser(JSON.parse(storedUser));
   // Set token globally for axios
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

		
		const fetchCategories = async () => {
			try {
				const res = await axios.get("http://localhost:5000/api/categories");
				setCategories(res.data || []);
			} catch (err) {
				setError(err.response?.data?.message || err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, [navigate]);

	const fetchProducts = async () => {
		setProductsLoading(true);
		try {
			const res = await axios.get("http://localhost:5000/api/products");
			console.log(res);
			setProducts(res.data || []);
		} catch (err) {
			setError(err.response?.data?.message || err.message);
		} finally {
			setProductsLoading(false);
		}
	};
//search
	const handleSearch = async () => {
  if (!searchQuery.trim()) return;

  try {
    setIsSearching(true);
//elastic search endpoint
		const res = await axios.get(
  `http://localhost:5000/api/products/search-es?q=${encodeURIComponent(searchQuery)}&page=${currentPage}&perPage=${PRODUCTS_PER_PAGE}`
);

setSearchResults(res.data.products || []);
		// backend returns { products: [...] }
		// setSearchResults(res.data.products || res.data); //update search results state with products returned from backend
    setSelectedCat(null); // stop category filtering
  } catch (err) {
    console.error(err);
  } finally {
    setIsSearching(false);
  }
};



	const handleCategoryClick = (cat) => {
		setSelectedCat(cat);
		setCurrentPage(1);
		if (products.length === 0) fetchProducts();
	};

	const filteredProducts = selectedCat
		? products.filter((p) => {
			return p.cd_id === (selectedCat.cd_id || selectedCat.id || selectedCat.cdId);
		})
		: [];

	const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));

	const paginated = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

	const gotoPage = (n) => setCurrentPage(Math.min(Math.max(1, n), totalPages));

	return (
		<div className="home-root">
			<Navbar 
	 user={user}
	 setSearchResults={setSearchResults}
	 setSelectedCat={setSelectedCat}
	 setParentSearchQuery={setSearchQuery}
	/>


			<header className="hero">
				<h1>Shop by Category</h1>
				
			</header>

			<main className="container">
				{loading && <div className="status">Loading categories...</div>}
				{error && <div className="status error">{error}</div>}

				{!loading && !error && (
					<div className="layout">
						<aside className="sidebar">
							<div className="category-list">
								{categories.length === 0 && (
									<div className="status">No categories yet.</div>
								)}

								{categories.map((cat) => (
									<div
										className={`card category-card ${selectedCat && selectedCat.cd_id === cat.cd_id ? "active" : ""}`}
										key={cat.cd_id}
										onClick={() => handleCategoryClick(cat)}
									>
										<div className="card-title">{cat.cd_name}</div>
										<div className="card-desc">{cat.cd_description || ""}</div>
									</div>
								))}
							</div>
						</aside>

	<div className="content">

  {isSearching && <div className="status">Searching...</div>}

  {/* SEARCH MODE */}
  {searchResults.length > 0 && (
    <section className="products-section">
      <h2 className="section-title">Search Results</h2>

      <div className="products-grid">
        {searchResults.map((p) => (
          <div className="card product-card" key={p.pd_id}>
            <div className="card-title">{p.pd_name}</div>
            <div className="card-desc">{p.pd_description}</div>
            <div className="price">
              ${parseFloat(p.pd_price).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )}

  {/* NO SEARCH RESULTS */}
  {searchQuery && !isSearching && searchResults.length === 0 && (
    <div className="status">No products found.</div>
  )}

  {/* CATEGORY MODE */}
  {!searchQuery && selectedCat && (
    <section className="products-section">
      <h2 className="section-title">Products — {selectedCat.cd_name}</h2>

      {productsLoading && <div className="status">Loading products...</div>}

      {!productsLoading && filteredProducts.length === 0 && (
        <div className="status">No products in this category.</div>
      )}

      <div className="grid products-grid">
        {paginated.map((p) => (
          <div className="card product-card" key={p.pd_id}>
            <div className="card-title">{p.pd_name}</div>
            <div className="card-desc">{p.pd_description}</div>
            <div className="price">
              ${parseFloat(p.pd_price).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )}

  {/* DEFAULT STATE */}
  {!searchQuery && !selectedCat && (
    <div className="status">Select a category to view products.</div>
  )}

</div>
					</div>
				)}
			</main>
		</div>
		);
}

export default Home;
