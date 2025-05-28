

// import { useState, useEffect } from "react";
// import axios from 'axios';
// import Box from '@mui/material/Box';
// import React, { Suspense } from 'react';
// import './App.css';
// import { Route, Routes } from 'react-router-dom'
// import { useSelector } from 'react-redux';

// // import MainLayout from './Components/Layout/MainLayout';
// import Admin from "./Components/Admin/Admin";

// const LazyLogin = React.lazy(() => import('./Components/Common/Login'))
// const LazyShopHome = React.lazy(() => import('./Components/Shops/Shops'))
// const LazyDeliverHome = React.lazy(() => import('./Components/Delivers/Delivers'))
// const LazyAdminHome = React.lazy(() => import('./Components/Admin/Admin'))
// const LazyListDeliver = React.lazy(() => import('./Components/Admin/ListDeliver'))
// const LazyListShop=React.lazy(()=>import('./Components/Admin/ListShop'))
// const LazyDeliverMap = React.lazy(() => import('./Components/Delivers/DeliverMap'))

// function App() {
//   const { token, role, user,name,area,city,active } = useSelector((state) => state.token);

//   return (
//     <div className="App">
//       {/* {role === "Deliver" ? <h1>deliver</h1> : role === "Shop" ? <h1>shop</h1> : null} */}

//       <Routes>
//         {/* כל הנתיבים הרגילים */}
//         <Route path='/' element={<Suspense fallback="loading..."><LazyLogin /></Suspense>} />
//         <Route path='/Login' element={<Suspense fallback="loading..."><LazyLogin /></Suspense>} />
//         <Route path='/Shop' element={<Suspense fallback="loading..."><LazyShopHome /></Suspense>} />
//         <Route path='/Deliver' element={<Suspense fallback="loading..."><LazyDeliverHome /></Suspense>} />

//         <Route path='/Deliver/myOrder' element={<Suspense fallback="loading..."><LazyDeliverMap /></Suspense>}
//         />
 
//         <Route path='/Admin' element={<LazyAdminHome />}>
//           <Route path='ListDeliver' element={<Suspense fallback="loading..."><LazyListDeliver /></Suspense>} />
//           <Route path='ListShop' element={<Suspense fallback="loading..."><LazyListShop /></Suspense>} />

//         </Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;

// client/src/App.js

import { useState, useEffect } from "react";
import axios from 'axios';
import Box from '@mui/material/Box';
import React, { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';

// import MainLayout from './Components/Layout/MainLayout';
import Admin from "./Components/Admin/Admin";

const LazyLogin = React.lazy(() => import('./Components/Common/Login'))
const LazyShopHome = React.lazy(() => import('./Components/Shops/Shops'))
const LazyDeliverHome = React.lazy(() => import('./Components/Delivers/Delivers')) // זה הנתיב הראשי למשלוחנים
const LazyAdminHome = React.lazy(() => import('./Components/Admin/Admin'))
const LazyListDeliver = React.lazy(() => import('./Components/Admin/ListDeliver'))
const LazyListShop = React.lazy(() => import('./Components/Admin/ListShop'))
// const LazyDeliverMap = React.lazy(() => import('./Components/Delivers/DeliverMap')) // ייתכן ולא תצטרכי את זה כנתיב נפרד יותר

function App() {
  // קבלת נתוני המשתמש מתוך אובייקט ה-user החדש ב-Redux
  const { user, accessToken } = useSelector((state) => state.auth); // שינוי ל-state.auth

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Suspense fallback="loading..."><LazyLogin /></Suspense>} />
        <Route path='/Login' element={<Suspense fallback="loading..."><LazyLogin /></Suspense>} />
        <Route path='/Shop' element={<Suspense fallback="loading..."><LazyShopHome /></Suspense>} />
        {/* הנתיב היחיד למשלוחנים הוא /Deliver */}
        <Route path='/Deliver' element={<Suspense fallback="loading..."><LazyDeliverHome /></Suspense>} />

        {/* הנתיב /Deliver/myOrder כבר לא יטופל ישירות ב-App.js
           אלא ימומש כקומפוננטה פנימית בתוך Delivers */}
        {/* <Route path='/Deliver/myOrder' element={<Suspense fallback="loading..."><LazyDeliverMap /></Suspense>} /> */}

        <Route path='/Admin' element={<LazyAdminHome />}>
          <Route path='ListDeliver' element={<Suspense fallback="loading..."><LazyListDeliver /></Suspense>} />
          <Route path='ListShop' element={<Suspense fallback="loading..."><LazyListShop /></Suspense>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;