import React, { useEffect, useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";

function Product() {

    const baseURL = "http://localhost:3000/";
    const [products, setProducts] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/test");
            const result = await response.json();
            // API response shape: { status, message, products: [...] }
            setProducts(result.products || []);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="products-section">
            <div className="container">

                {/* ================= HEADING ================= */}
                <div className="text-center products-heading">
                    <p className="section-small-title">OUR COLLECTION</p>
                    <h2 className="section-title">Explore Our Furniture</h2>
                    <p className="section-description">
                        Discover stylish, comfortable and high-quality furniture for every room of your home.
                        From cozy sofas to elegant dining sets, find pieces that match your style and space.
                    </p>
                </div>

                <div className="search-bar position-relative">
                    <i className="bi bi-search search-icon position-absolute top-50 start-0 ms-3 translate-middle-y"></i>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                    />
                </div>

                {/* ================= PRODUCTS ================= */}
                <div className="row g-4">
                    {products.length === 0 ? (
                        <p className="text-center">No products found.</p>
                    ) : (
                        products.map((data) => (
                            <div className="col-12 col-sm-6 col-lg-4" key={data.id}>
                                <Link to={`/product/detail/${data.id}`}>
                                    <div className="product-card">

                                        <div className="product-image-box">
                                            <button className="heart-btn">
                                                <i className="bi bi-heart"></i>
                                            </button>

                                            <img
                                                src={baseURL + data.image}
                                                alt={data.name}
                                                className="product-image"
                                            />
                                        </div>

                                        <div className="product-info">
                                            <span className="product-id">SKU: {data.sku}</span>

                                            <h4>{data.name}</h4>

                                            <p className="product-description">
                                                {data.description}
                                            </p>

                                            <div className="rating">
                                                <i className="bi bi-star-fill"></i>
                                                <span>{data.rating}</span>
                                            </div>

                                            <div className="price-box">
                                                <span className="price">Rs. {data.price}</span>
                                            </div>

                                            <button className="add-btn"
                                                onClick={async () => {
                                                    const response = await fetch('http://localhost:3000/api/v1/cart/add', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            "Authorization": "Bearer " + sessionStorage.getItem("token")

                                                        },
                                                        body: JSON.stringify({
                                                            product_id: data.id,
                                                            quantity: 1,
                                                            user_id: sessionStorage.getItem('userID'),
                                                        }),

                                                    });
                                                    const result = await response.json();
                                                    console.log(result);
                                                }}

                                            >
                                                <i className="bi bi-bag-plus me-2"></i>




                                                Add to Cart
                                            </button>
                                        </div>

                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </section>
    );
}

export default Product;