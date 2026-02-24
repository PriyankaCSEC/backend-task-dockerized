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
	//isSearching removed natively


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
				const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`);
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
			const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
			console.log(res);
			setProducts(res.data || []);
		} catch (err) {
			setError(err.response?.data?.message || err.message);
		} finally {
			setProductsLoading(false);
		}
	};
	// search removed



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

	const searchTotalPages = Math.max(1, Math.ceil(searchResults.length / PRODUCTS_PER_PAGE));
	const searchPaginated = searchResults.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

	const gotoPage = (n) => setCurrentPage(Math.min(Math.max(1, n), totalPages));
	const searchGotoPage = (n) => setCurrentPage(Math.min(Math.max(1, n), searchTotalPages));

	const PAGES_PER_GROUP = 4;
	const currentGroup = Math.ceil(currentPage / PAGES_PER_GROUP);
	const startPage = (currentGroup - 1) * PAGES_PER_GROUP + 1;
	const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

	const pageNumbers = [];
	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	const searchCurrentGroup = Math.ceil(currentPage / PAGES_PER_GROUP);
	const searchStartPage = (searchCurrentGroup - 1) * PAGES_PER_GROUP + 1;
	const searchEndPage = Math.min(searchStartPage + PAGES_PER_GROUP - 1, searchTotalPages);

	const searchPageNumbers = [];
	for (let i = searchStartPage; i <= searchEndPage; i++) {
		searchPageNumbers.push(i);
	}

	return (
		<div className="home-root">
			<Navbar
				user={user}
				setSearchResults={setSearchResults}
				setSelectedCat={setSelectedCat}
				setParentSearchQuery={setSearchQuery}
				setCurrentPage={setCurrentPage}
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

							{/* isSearching removed natively */}

							{/* SEARCH MODE */}
							{searchResults.length > 0 && (
								<section className="products-section">
									<h2 className="section-title">Search Results</h2>

									<div className="products-grid">
										{searchPaginated.map((p) => (
											<div className="card product-card" key={p.pd_id}>
												<div className="card-title">{p.pd_name}</div>
												<div className="card-desc">{p.pd_description}</div>
												<div className="price">
													${parseFloat(p.pd_price).toFixed(2)}
												</div>
											</div>
										))}
									</div>

									{/* Search Pagination */}
									{searchTotalPages > 1 && (
										<div className="pagination">
											<button
												onClick={() => searchGotoPage(searchStartPage - 1)}
												disabled={searchStartPage === 1}
											>
												«
											</button>
											{searchPageNumbers.map((num) => (
												<button
													key={num}
													className={currentPage === num ? "active" : ""}
													onClick={() => searchGotoPage(num)}
												>
													{num}
												</button>
											))}
											<button
												onClick={() => searchGotoPage(searchEndPage + 1)}
												disabled={searchEndPage === searchTotalPages}
											>
												»
											</button>
										</div>
									)}
								</section>
							)}

							{/* NO SEARCH RESULTS */}
							{searchQuery && searchResults.length === 0 && (
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

									{/* Pagination */}
									{totalPages > 1 && (
										<div className="pagination">
											<button
												onClick={() => gotoPage(startPage - 1)}
												disabled={startPage === 1}
											>
												«
											</button>
											{pageNumbers.map((num) => (
												<button
													key={num}
													className={currentPage === num ? "active" : ""}
													onClick={() => gotoPage(num)}
												>
													{num}
												</button>
											))}
											<button
												onClick={() => gotoPage(endPage + 1)}
												disabled={endPage === totalPages}
											>
												»
											</button>
										</div>
									)}
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
