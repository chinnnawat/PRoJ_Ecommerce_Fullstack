import React from 'react';
import ReactDOM from 'react-dom/client';

// Route
import App from './App';
import PrivateRoute from './component/PrivateRoute';
import AdminRoute from './component/AdminRoute'

import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './custome.scss'


// ทำความเข้าใจการใช้ react router dom เพิ่มเติม https://medium.com/@pratya.yeekhaday/reactjs-%E0%B8%97%E0%B8%9A%E0%B8%97%E0%B8%A7%E0%B8%99-react-router-dom-v6-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A-typescript-ec1b7e3427b7
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

// Screen
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import AllProduct from './screens/AllProduct';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'

// Private Screen
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';

// Admin Screen
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserForEditScreen from './screens/admin/UserForEditScreen';

import { Provider } from 'react-redux';
import store from './store';

// Paypal Provider
import {PayPalScriptProvider} from '@paypal/react-paypal-js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/page/:pageNumber' element={<HomeScreen/>}/>
      <Route path='/search/:keyword' element={<HomeScreen/>}/>
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen/>}/>
      <Route path='/products/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>

      {/* Private Route */}
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/shipping' element={<ShippingScreen/>}/>
        <Route path='/payment' element={<PaymentScreen/>}/>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
        <Route path='/order/:id' element={<OrderScreen/>}/>
        <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>

      {/* Admin Route */}
      <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
        <Route path='/admin/productlist' element={<ProductListScreen/>}/>
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>}/>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
        <Route path='/admin/userlist' element={<UserListScreen/>}/>
        <Route path='/admin/user/:id/edit' element={<UserForEditScreen/>}/>
      </Route>

      {/* My Self */}
      <Route path='/all' element={<AllProduct/>}/>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* <Provider store={store}>: ครอบ component <RouterProvider> */}
    {/* <Provider> เพื่อให้ component ที่อยู่ภายใน <RouterProvider> สามารถเข้าถึง state 
    ที่จัดเก็บใน Redux store ได้. <Provider> เป็น component 
    ที่มาจาก Redux library และรับ store ของ Redux เป็น prop 
    เพื่อให้ component ที่อยู่ภายในมี aaccess ถึง state และสามารถ dispatch actions 
    ไปยัง Redux store ได้. */}
    <Provider store={store}>
      {/* RouterProvider ใช้คู่กับ const router ในการกำหนด path และ element ในการแสดงออกตาม path
      จากโค้ดบรรทัดล่าง ใช้  router={router} ซึ่งแสดง element คือ App ในการแสดงตาม path "/" */}
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
