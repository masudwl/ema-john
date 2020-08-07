import React from "react";
import { useForm } from "react-hook-form";
import './Shipment.css';
import { useAuth } from '../Login/use-auth';



const Shipment = () => {
    
    const { register, handleSubmit, errors } = useForm(); 
    const onSubmit = data => console.log(data);
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