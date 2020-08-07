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
                
                
                    { auth.user && 
                        <span style={{color: 'red'}}> Welcome {auth.user.name}</span>
                    }
                    {
                        auth.user ? <Link to="/login"> Sign Out </Link>
                        : <Link to="/login"> Sign In </Link>
                    }
             
            </nav>
            
        </div>
    );
};

export default Header;