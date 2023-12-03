import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';


// ทำความเข้าใจการใช้ react router dom เพิ่มเติม https://medium.com/@pratya.yeekhaday/reactjs-%E0%B8%97%E0%B8%9A%E0%B8%97%E0%B8%A7%E0%B8%99-react-router-dom-v6-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A-typescript-ec1b7e3427b7
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* RouterProvider ใช้คู่กับ const router ในการกำหนด path และ element ในการแสดงออกตาม path
      จากโค้ดบรรทัดล่าง ใช้  router={router} ซึ่งแสดง element คือ App ในการแสดงตาม path "/" */}
    <RouterProvider router={router}/>
  </React.StrictMode>
);
reportWebVitals();
