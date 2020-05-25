import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img, seller, stock, price, key} = props.product; 

    return (
        <div className="single-product">
            <div>
                <img src= {img} alt=""/>
            </div>
            <div className="product-name">
                <h3><Link to={"/product/"+key}>{name}</Link></h3>
                <p>Seller: {seller}</p>
                <p>Price: $ {price}</p>
                <p>Only {stock} left is stock</p>
                { props.showAddToCart === true && <button className="btn" 
                onClick={()=> props.addToCartHandler(props.product)}>
                <FontAwesomeIcon icon={faShoppingCart}/> Add to Cart
                </button>}
            </div>
        </div>
    );
};

export default Product;