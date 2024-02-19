import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import BasketPage from "./Pages/BasketPage/BasketPage";
import CatalogItemPage from "./Pages/MainPage/CatalogItemPage/CatalogItemPage";
import OrderPage from "./Pages/OrderPage/OrderPage";
import OrderItemsPage from "./Pages/OrderPage/OrderItemPage/OrderItemsPage";
import AuthCallback from "./components/AuthCallback";

function App() {
  return (
      <Routes>
        <Route path='/' element={<MainPage/>}></Route>
        <Route path='/signin-oidc' element={<AuthCallback/>}></Route>
        <Route path='/basket' element={<BasketPage/>}></Route>
        <Route path='/item/:id' element={<CatalogItemPage/>}></Route>
        <Route path='/order' element={<OrderPage/>}></Route>
        <Route path='/order/:id' element={<OrderItemsPage/>}></Route>
      </Routes>
  );
}
export default App;
