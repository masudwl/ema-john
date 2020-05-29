import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { useAuth } from '../Login/use-auth';
import { Link } from 'react-router-dom';

const Header = () => {
   const auth = useAuth(); 
    
    return (
        <div className="header">
            
                <img src={logo} alt=""/>
                
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory Stock</a>
                <a href="/login">Login</a>
                
                
                    <span style={{color: 'red'}}>{}</span>
             
            </nav>
            
        </div>
    );
};

export default Header;