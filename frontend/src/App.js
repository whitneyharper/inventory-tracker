import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../src/Hooks/useAuthContext';
import WarehousesPage from './Pages/WarehousesPage';
import InventoryPage from './Pages/InventoryPage';
import NewProductPage from './Pages/NewProductPage'
import NewWarehousePage from './Pages/NewWarehousePage';
import ProductPage from './Pages/ProductPage';
import WarehousePage from './Pages/WarehousePage';
import Login from './Pages/LoginPage';
import SignupForm from './Pages/SignupPage';
import './App.css';

function App() {

  const { user } = useAuthContext();
  
  return (
      <div className="App">  
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/inventory" element={user ? <InventoryPage /> : <Navigate to="/" />} />
            <Route path="/inventory/create" element={user ? <NewProductPage /> : <Navigate to="/" />} />
            <Route path="/inventory/:id" element={user ? <ProductPage /> : <Navigate to="/" />} />
            <Route path="/warehouse" element={user ? <WarehousesPage /> : <Navigate to="/" />} />
            <Route path="/warehouse/create" element={user ? <NewWarehousePage /> : <Navigate to="/" />} />
            <Route path="/warehouse/:id" element={user ? <WarehousePage/> : <Navigate to="/" />}/>
          </Routes>
        </BrowserRouter>  
      </div>

  );
}

export default App;
