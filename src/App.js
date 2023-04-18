// import { useState } from 'react'
import Navbar from './share/navbar/Navbar'
import Home from './pages/home/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart';
import Login from './pages/authentication/Login';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubCategory from './pages/SubCategory';
import Checkout from './pages/checkout/Checkout';
import Payment from './pages/payment-getway/Payment';
import SignUp from './pages/authentication/SingUp';

import Footer from './share/footer/Footer';
import Orders from './pages/admin/Orders';
import Dashboard from './pages/admin/Dashboard';
import AllUser from './pages/admin/AllUser';
import MyOrders from './pages/admin/MyOrders';

import Profile from './pages/admin/Profile';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import Search from './pages/search/Search';
import ResetPassword from './pages/authentication/ResetPassword';
import UploadProducts from './pages/admin/uploadProducts';
import Home3 from './pages/admin/AllProducts';
import CreateCategory from './pages/admin/CreateCategory';
import Category from './pages/category';
import url from './components/url';
import RequireAuth from './pages/authentication/RequireAuth';




export const UserContext = createContext('mohid')

function App() {

  const [user, setUser] = useState(false)
  const [dip, setDip] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetch(`${url}/me`, {
      method: 'GET',
      headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },

    }).then(res => res.json())
      .then(data => {

        if (data.email) {
          setUser(true)
          setLoading(false)
        }
      }).catch(error => {
        setUser(false)
      });
setLoading(false)
  }, [dip])





  return (
    <UserContext.Provider value={{ user, setUser, dip, setDip, loading, setLoading }}>
      <div>
        <div>
          <Navbar />
        </div>
        <div className=' sm:pt-[100px] pt-[60px]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:productCategory' element={<Category />} />
            <Route path='/sub/:subCategoryName' element={<SubCategory />} />
            <Route path='productDetails/:productId' element={<ProductDetails />} />
            <Route path='search' element={<Search />} />
            <Route path='cart' element={<RequireAuth><Cart /></RequireAuth>} />
            <Route path='login' element={<Login />} />
            <Route path='resetPassword' element={<ResetPassword />} />
            <Route path='signUp' element={<SignUp />} />
            <Route path='checkout' element={<RequireAuth><Checkout /></RequireAuth>} />
            <Route path='payment' element={<RequireAuth><Payment /></RequireAuth>} />
            <Route path='dashboard' element={<RequireAuth><Dashboard /></RequireAuth>}>
              <Route index='profile' element={<Profile></Profile>}></Route>
              <Route path='MyOrders' element={<MyOrders></MyOrders>}></Route>
              <Route path='AllOrders' element={<Orders />}></Route>
              <Route path='allUser' element={<AllUser />}></Route>
              <Route path='allProducts' element={< Home3 />} />
              <Route path='uploadProducts' element={<UploadProducts />} />
              <Route path='createCategory' element={<CreateCategory />} />
            </Route>
          </Routes>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </UserContext.Provider>
  )
}

export default App
