import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import * as firebase from "firebase/app";
import "firebase/auth";

function App() {
  return (
    <Router>
    <Header></Header>
      <Switch>
        <Route path="/shop"><Shop></Shop></Route>
        <Route path="/review"><Review></Review></Route>
        <Route path="/inventory"><Inventory></Inventory></Route>
        <Route exact path="/"><Shop></Shop></Route>
        <Route path="/product/:productKey"><ProductDetail></ProductDetail></Route>
        <Route path="/login"><Login></Login></Route>
        <Route path="*"><Notfound></Notfound></Route>
        
      </Switch>
    <div>
     
    </div>
    </Router>
  );
}

export default App;
