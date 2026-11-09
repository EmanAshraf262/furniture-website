import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { useParams } from "react-router-dom";

function ProductDetail() {


    const baseURL = "http://localhost:3000/";
    const [product, setProduct] = useState();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/product/${id}`
            );

            const result = await response.json();

            // Abhi sirf first product ki detail check kar rahe hain
            setProduct(result.product);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="product-detail-section">
            <div className="container">

                <div className="row align-items-center">

                    {/* IMAGE */}
                    <div className="col-md-6">

                        <div className="detail-image-box">

                            <img

                                src={baseURL + product.image}
                                // src={product.image}
                                alt={product.name}
                                className="detail-image"
                            />

                        </div>

                    </div>


                    {/* DETAILS */}
                    <div className="col-md-6">

                        <div className="product-detail-info">

                            <span className="detail-category">
                                {product.category}
                            </span>

                            <h1>{product.name}</h1>

                            <p className="detail-id">
                                Product ID: {product.id}
                            </p>

                            <p className="detail-description">
                                {product.description}
                            </p>


                            {/* COLOR */}
                            <div className="detail-item">
                                <strong>Color:</strong>
                                <span>{product.color}</span>
                            </div>


                            {/* RATING */}
                            <div className="detail-rating">

                                <i className="bi bi-star-fill"></i>

                                <span>
                                    {product.rating}
                                </span>

                                <small>
                                    ({product.review_count} Reviews)
                                </small>

                            </div>


                            {/* PRICE */}
                            <div className="detail-price">

                                <span className="current-price">
                                    {product.price}
                                </span>

                                <span className="compare-price">
                                    {product.compare_price}
                                </span>

                            </div>


                            {/* STATUS */}
                            <div className="detail-status">
                                Status: <strong>{product.status}</strong>
                            </div>


                            {/* BUTTON */}
                            <button className="detail-cart-btn"
                            
                            
                            
                                 onClick={async () => {
                                    const response = await fetch('http://localhost:3000/api/v1/cart/add', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'

                                        },
                                        body: JSON.stringify({
                                            product_id: product.id,
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

                </div>

            </div>
        </section>
    );
}

export default ProductDetail;