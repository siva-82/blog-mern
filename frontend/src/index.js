import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'

import store from './store';
import { Provider } from 'react-redux';

import AllBlogs from './pages/AllBlogs';
import SingleBlog from './pages/SingleBlog';
import Login from './pages/LoginScreen';



const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Login/>}></Route>
      <Route  path='/allBlogs' element={<AllBlogs/>}></Route>
      <Route path="/SingleBlog/:id" element={<SingleBlog />} />
      {/* <Router>
          <Routes>
            <Route index element={<AllBlogs />} />
            <Route path="SingleBlog" element={<SingleBlog />} />

          </Routes>
        </Router> */}
      
    </Route> 
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
 <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
);

