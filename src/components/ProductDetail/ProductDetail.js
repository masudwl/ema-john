import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams(); 
    const [product, setProducts] = useState(null); 

    useEffect( () => {
        fetch('http://localhost:4000/product/' +  productKey)
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        })
    }, [])
    return (

        <div>
            <h1> Product Detail</h1>
            { product && 
                <Product showAddToCart = {false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;