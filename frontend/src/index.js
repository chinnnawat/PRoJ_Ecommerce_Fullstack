import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
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

import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
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
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
