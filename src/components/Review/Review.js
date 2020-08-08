import React, {useEffect, useState} from 'react';
import { getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import ReviewItem from '../ReveiwItem/ReviewItem';
import Cart from '../../components/Cart/Cart';
import { Link } from 'react-router-dom';
import Auth from '../Login/use-auth';


const Review = () => {
    const [cart, setCart] = useState([]);

    const removeBtn = (productKeys => {
        const newCart = cart.filter(pd => pd.key !== productKeys); 
        setCart(newCart); 
        removeFromDatabaseCart(productKeys); 
    })
    useEffect(() => {
       const localStorage = getDatabaseCart();
       const productKeys = Object.keys(localStorage); 
       console.log(productKeys);
       fetch('http://localhost:4000/getsProductByKey', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(productKeys)
       })
       .then(res => res.json())
       .then(data => {
       const cartProducts = productKeys.map(key => {
           const productData = data.find(pd => pd.key === key); 
           productData.quantity = localStorage[key]; 
           return productData;
       }); 
       setCart(cartProducts);
    })
    }, [])
   
   const auth = Auth(); 

    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                    key ={pd.key}
                    product={pd}
                    removeBtn = {removeBtn}
                    
                    ></ReviewItem>)
            }
            {!cart.length && <h1>Your cart is Emty. <a href="/shop">Keep Shopping </a></h1>}
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
            <Link to="shipment">
               { auth.user ? 
                   <button  className="btn">Checkout</button>
                   : 
                   <button  className="btn">Proceed Order</button>
                }
            </Link>
            </Cart>
        </div>
        </div>
    );
};

export default Review;