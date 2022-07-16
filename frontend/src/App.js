import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WarehousesPage from './Pages/WarehousesPage';
import InventoryPage from './Pages/InventoryPage';
import NewProductPage from './Pages/NewProductPage'
import NewWarehousePage from './Pages/NewWarehousePage';
import ProductPage from './Pages/ProductPage';
import WarehousePage from './Pages/WarehousePage';
import Login from './Pages/LoginPage';
import './App.css';

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/create" element={<NewProductPage />} />
          <Route path="/inventory/:id" element={<ProductPage />} />
          <Route path="/warehouse" element={<WarehousesPage />} />
          <Route path="/warehouse/create" element={<NewWarehousePage />} />
          <Route path="/warehouse/:id" element={<WarehousePage/>}/>
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
