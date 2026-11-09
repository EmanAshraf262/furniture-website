import React, { useEffect, useState } from 'react';
import './cart.css';

export default function Cart() {

    const [cartData, setCartData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/cart/10' + sessionStorage.getItem('userId'),{
                method:'POST'
            });
            const result = await response.json();
            setCartData(result);
        }
        catch(error){

        }
        finally{
            setIsLoading(false);
        }
    };

    useEffect
    (() => {
        getData();
    }, [])
    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    console.log(cartData);


    return (
        <div className="cart-page-container">
            {/* Page Header */}
            <div className="cart-header">
                <h1 className="cart-title">Shopping Cart</h1>
                <p className="cart-subtitle">Review your selected items</p>
            </div>

            {/* Main Cart Layout: Items (Left) & Order Summary (Right) */}
            <div className="cart-main-layout">
                {/* Left Side: Cart Items List */}

            
                <div className="cart-items-column">
                    {/* Cart Item Placeholder 1 */}
                    <div className="cart-item">
                        <div className="cart-item-image-box">
                            <span>Image</span>
                            {/* <img src='' alt="image" /> */}
                        </div>

                        <div className="cart-item-info">
                            <h3 className="cart-item-name">Product Name</h3>
                            <p className="cart-item-description">Product description</p>
                            <span className="cart-item-price">Price</span>
                        </div>

                        <div className="cart-item-controls">
                            <div className="quantity-box">
                                <button type="button" className="qty-btn">−</button>
                                <span className="qty-value">Quantity</span>
                                <button type="button" className="qty-btn">+</button>
                            </div>

                            <button type="button" className="remove-btn">
                                Remove
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Side: Order Summary */}
                <div className="cart-summary-column">
                    <div className="order-summary-card">
                        <h2 className="summary-title">Order Summary</h2>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>Subtotal</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Shipping</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total</span>
                            <span>Total</span>
                        </div>

                        <div className="summary-buttons">
                            <button type="button" className="btn-checkout">
                                Proceed to Checkout
                            </button>
                            <button type="button" className="btn-continue">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Empty Cart UI Section Placeholder */}
            {/* <div className="empty-cart-placeholder">
                <h2 className="empty-cart-title">Your Cart is Empty</h2>
                <p className="empty-cart-subtitle">
                    Add some products to your cart to see them here.
                </p>
                <button type="button" className="btn-continue">
                    Continue Shopping
                </button>
            </div> */}
        </div>
    );
}