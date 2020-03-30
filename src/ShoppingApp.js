import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-input-range/lib/css/index.css'
import Header from './components/Header'
import ShoppingList from './components/ShoppingList'
import ShoppingCart from './components/ShoppingCart'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function ShoppingApp() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/" component={ShoppingList}/>
          <Route path="/shopping-cart" component={ShoppingCart}/>
          <Route path="/lookup" component={ShoppingList}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default ShoppingApp;
