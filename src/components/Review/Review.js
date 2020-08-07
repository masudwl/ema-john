import React, {useEffect, useState} from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReveiwItem/ReviewItem';
import Cart from '../../components/Cart/Cart';
import lastImg from '../../images/giphy.gif'; 
import { Link } from 'react-router-dom';
import Auth from '../Login/use-auth';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setPlaceOrder] = useState(false); 
    
    const placeOrderBtn =() =>{
        setCart([]); 
        setPlaceOrder(true); 
        processOrder(); 
    }
    const removeBtn = (productKeys => {
        const newCart = cart.filter(pd => pd.key !== productKeys); 
        setCart(newCart); 
        removeFromDatabaseCart(productKeys); 
    })
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
   
    let thankYou; 
   if(orderPlace){
        thankYou = <img src={lastImg} alt=""/>
   }

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
            {thankYou}
            {!cart.length && <h1>Your cart is Emty. <a href="/shop">Keep Shopping </a></h1>}
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
            <Link to="shipment">
               { auth.user ? 
                   <button onClick ={placeOrderBtn} className="btn">Checkout</button>
                   : 
                   <button onClick ={placeOrderBtn} className="btn">Proceed Order</button>
                }
            </Link>
            </Cart>
        </div>
        </div>
    );
};

export default Review;