import React, { useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'; 
import {useState} from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const firstTen = fakeData.slice(0,10); 
    const [products, setProducts] = useState(firstTen);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const localStorage = getDatabaseCart();
        const productKeys = Object.keys(localStorage); 
        const cartProducts = productKeys.map(key => {
            const productData = fakeData.find(pd => pd.key === key); 
            productData.quantity = localStorage[key]; 
            return productData;
        }); 
        setCart(cartProducts);
     }, [])

    const addToCartHandler =(product)=>{
        const toBeAddedKey = product.key; 
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1; 
        let newCart; 
        if(sameProduct){
            count = sameProduct.quantity + 1; 
            sameProduct.quantity = count; 
            const others = cart.filter(pd => pd.key !== toBeAddedKey); 
            newCart = [...others, sameProduct]; 
        }
        else{
            product.quantity = 1; 
            newCart = [...cart, product]; 
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count); 
    }

    return (
        <div className="shop-container">
            <div className="product-container">

                {
                    products.map(product => 
                        <Product
                            key = {product.key}
                            showAddToCart = {true}
                            addToCartHandler = {addToCartHandler} 
                            product={product}>
                        </Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="btn">Order Review</button>
                    </Link>
                </Cart> 
            </div>    
        </div>
    );
};

export default Shop;