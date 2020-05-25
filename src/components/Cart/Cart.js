import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;

    // const total = cart.reduce((total, pd) => total + pd.price, 0);

    let total = 0; 
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
       total = total + product.price * product.quantity; 
    } 
    let shipping = 0; 
    if(total> 500){
        shipping = 20;
    }
    else if (total > 100 ){
        shipping = 40; 
    }
    else if (total > 0){
        shipping = 50; 
    }
    const formateNumber = num=> {
        const precesion = num.toFixed(2); 
        return Number(precesion); 
    }
    let tax = total / 10.; 
    return (
        <div>
            <h3>Order Sammary</h3>
            <p>Items Order: {cart.length}</p>
            <p>Product Price : {formateNumber(total)}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>TAX : {formateNumber(tax)}</p>
            <p>Total Price: {formateNumber(total+shipping+tax)}</p>
            {props.children}
        </div>
    );
};

export default Cart;