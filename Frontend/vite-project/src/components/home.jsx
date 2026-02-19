import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import AllProducts from "./AllProducts";


function Home() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [products, setProducts] = useState([]);
	const [productsLoading, setProductsLoading] = useState(false);
	const [selectedCat, setSelectedCat] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const PRODUCTS_PER_PAGE = 5;
	const user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();

	useEffect(() => {
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
	}, []);

	const fetchProducts = async () => {
		setProductsLoading(true);
		try {
			const res = await axios.get("http://localhost:5000/api/products");
			setProducts(res.data || []);
		} catch (err) {
			setError(err.response?.data?.message || err.message);
		} finally {
			setProductsLoading(false);
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
			<nav className="nav">
				<div className="nav-left">ECom</div>

				<div className="nav-center">
					<input
						type="text"
						placeholder="Search products..."
						className="search-input"
					/>
				</div>

				<div className="nav-right">
					<button className="all-products-btn"
					onClick={() => navigate("/api/allproducts")}
					>
						All Products
					</button>
					<a href="/api/signin" className="nav-link">Signin</a>
					<a href="/api/signup" className="nav-link">Signup</a>
				</div>
			</nav>


			<header className="hero">
				<h1>Shop by Category</h1>
				<p>Browse products grouped by categories from the database.</p>
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
							{!selectedCat && <div className="status">Select a category to view products.</div>}

							{selectedCat && (
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
												<div className="price">${parseFloat(p.pd_price).toFixed(2)}</div>
											</div>
										))}
									</div>

									{/* Pagination */}
									{filteredProducts.length > PRODUCTS_PER_PAGE && (
										<div className="pagination">
											<button onClick={() => gotoPage(currentPage - 1)} disabled={currentPage === 1}>&laquo; Prev</button>
											{Array.from({ length: totalPages }).map((_, i) => (
												<button
													key={i}
													className={currentPage === i + 1 ? "active" : ""}
													onClick={() => gotoPage(i + 1)}
												>
													{i + 1}
												</button>
											))}
											<button onClick={() => gotoPage(currentPage + 1)} disabled={currentPage === totalPages}>Next &raquo;</button>
										</div>
									)}
								</section>
							)}
						</div>
					</div>
				)}
			</main>
		</div>
		);
}

export default Home;
