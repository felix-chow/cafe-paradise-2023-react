import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchUserInfo, fetchUserMenuItemByUser, getUserMenuItem } from '../axios-services';
// import '../style/App.css';
import {
  Home,
  Menu,
  MenuItem,
  Cart,
  Checkout,
  Navigation,
  AccountForm,
  MyProfile,
  Categories,
  SingleCategory,
  // Users,
  OrderConfirmation
} from './index';

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [itemCount, setItemCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );
  const [cart, setCart] = useState(
    window.localStorage.getItem("cart") || []);
  useEffect(() => {
    async function fetchUserData(token) {
      const result = await fetchUserInfo(token);
      setUserInfo(result);
    }
    if (token) {
      fetchUserData(token);
      if (token) {
        fetchUserData(token);
      }
    }
  }, [token]);

  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="App">
      <Navigation token={token} userInfo={userInfo} setToken={setToken} setUserInfo={setUserInfo} itemCount={itemCount} cart={cart} menuItems={menuItems} categories={categories} setCategories={setCategories} />
      <main>
        <Routes>
          <Route path='/' element={<Home userInfo={userInfo} />}></Route>
          <Route path='/profile' element={<MyProfile userInfo={userInfo} token={token} setToken={setToken} setUserInfo={setUserInfo}/>}></Route>
          <Route path='/users/:action' element={<AccountForm setToken={setToken} cart={cart} setCart={setCart} userInfo={userInfo} />}></Route>
          <Route path='/menu_items' element={<Menu menuItems={menuItems} setMenuItems={setMenuItems} cart={cart} setCart={setCart} userInfo={userInfo} token={token} itemCount={itemCount} setItemCount={setItemCount} />}></Route>
          <Route path='/menu_items/:menuItemId' element={<MenuItem userInfo={userInfo} cart={cart} setCart={setCart} itemCount={itemCount} setItemCount={setItemCount} token={token} />}></Route>
          <Route path='/cart' element={<Cart cart={cart} setCart={setCart} menuItems={menuItems} setMenuItems={setMenuItems} userInfo={userInfo} token={token}/>}></Route>
          <Route path='/cart/checkout' element={<Checkout token={token} cart={cart} userInfo={userInfo} setName={setName} setOrderId={setOrderId}/>}></Route>
          <Route path='/cart/order-confirmation' element={<OrderConfirmation name={name} orderId={orderId} token={token} setCart={setCart} cart={cart}/>}></Route>
          <Route path='/categories' element={<Categories categories={categories} setCategories={setCategories} userInfo={userInfo} token={token} />}></Route>
          <Route path='/categories/:categoryName' element={<SingleCategory categories={categories} menuItems={menuItems} />}></Route>
          {/* <Route path='/users/list' element={<Users userInfo={userInfo} token={token}/>}></Route> */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
