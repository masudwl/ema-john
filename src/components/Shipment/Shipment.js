import React from "react";
import { useForm } from "react-hook-form";
import './Shipment.css';
import { useAuth } from '../Login/use-auth';
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";



const Shipment = () => {
    
    const { register, handleSubmit, errors } = useForm(); 
    const onSubmit = data => {
      //TODO: Masud move this after payment 
      const savedCart = getDatabaseCart();
      const orderDetail = {email: auth.user.email, cart: savedCart} 
      fetch('http://localhost:4000/placeOrder', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(orderDetail)
       })
       .then(res => res.json())
       .then(data => {
         console.log(data);
         alert('Successfully placed your order') 
         processOrder();
       })

    };
    const auth = useAuth();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-group">
          <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Your Name"/>
          {errors.name && <span className="error-msg">This field is required</span>}       
          <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your Email" />
          {errors.email && <span className="error-msg">This field is required</span>}
          <input name="phone" ref={register({ required: true })} placeholder="Your Mobile Number" />
          {errors.phone && <span className="error-msg">This field is required</span>}
          <input name="address" ref={register({ required: true })} placeholder="Your Address Line One" />
          {errors.address && <span className="error-msg">This field is required</span>}
          <input name="address2" ref={register({ required: true })} placeholder="Your Address Line two" />
          <input name="city" ref={register({ required: true })} placeholder="Your City" />
          {errors.city && <span className="error-msg">This field is required</span>}
          <input name="country" ref={register({ required: true })} placeholder="Your Country" />
          {errors.country && <span className="error-msg">This field is required</span>}
          
          <input type="submit" />
        </form>
      );
};

export default Shipment;