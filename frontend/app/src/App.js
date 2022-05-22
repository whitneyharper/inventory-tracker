import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import WarehousesPage from './Pages/WarehousesPage';
import InventoryPage from './Pages/InventoryPage';
import NewProductPage from './Pages/NewProductPage'
import NewWarehousePage from './Pages/NewWarehousePage';
import ProductPage from './Pages/ProductPage';
import WarehousePage from './Pages/WarehousePage';
import './App.css';

function App() {
  return (
    <div className="App">  
      <Router>
        <Switch>  
        <Route exact path='/'>
            <InventoryPage />
          </Route>  
          <Route exact path='/inventory/create'>
            <NewProductPage />
          </Route>
        <Route exact path='/inventory/:id'>
            <ProductPage />
          </Route>      
          <Route  exact path='/warehouse'>
            <WarehousesPage />
          </Route>  
          <Route  exact path='/warehouse/create'>
            <NewWarehousePage />
          </Route> 
          <Route  exact path='/warehouse/:id'>
            <WarehousePage />
          </Route> 
        </Switch>        
      </Router> 
    </div>
  );
}

export default App;
