import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    function handleInventoryItem(){
        const product = fakeData[0]; 
        console.log(product);
    
    fetch('http://localhost:4000/addProduct', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(fakeData)
    })
    .then(res => res.json())
    .then(data => {
        console.log('post successfull', data)
    })
    }
    return (
        <div>
            <h1>Add Invertory Items</h1>
            <button onClick={handleInventoryItem}>Add Product</button>
        </div>
    );
};

export default Inventory;