// import { useState } from 'react'
import Navbar from './share/navbar/Navbar'
import Home from './pages/home/Home'
import Category from './pages/category/Category';
import ProductDetails from './pages/product_details/ProductDetails'
import Cart from './pages/cart/Cart';
import Login from './pages/authentication/Login';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Form from './pages/admin/Form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubCategory from './pages/subCategory/SubCategory';
import Checkout from './pages/checkout/Checkout';
import Payment from './pages/payment-getway/Payment';
import SignUp from './pages/authentication/SingUp';
import RequireAuth from './pages/authentication/RequireAuth';
import Footer from './share/footer/Footer';
import Orders from './pages/admin/Orders';
import Dashboard from './pages/admin/Dashboard';
import AllUser from './pages/admin/AllUser';
import MyOrders from './pages/admin/MyOrders';
import RequireAdmin from './pages/authentication/RequireAdmin';
import Profile from './pages/admin/Profile';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import Search from './pages/search/Search';




export const UserContext = createContext('mohid')

function App() {
  const navigate = useNavigate()

  const [user] = useAuthState(auth)
  const customersEmail = user?.email;
  const [countCartProducts, setCountCartProducts] = useState(0)





  const [searchName, setSearchName] = useState('All');
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [loading, setLoading] = useState(true);





  useEffect(() => {
    setLoading(true)
    fetch(`https://mohid-shop.onrender.com/productsName/${searchName}`)
      .then(res => res.json())
      .then(data => {
        setSearchedProducts(data)
        setLoading(false)

      })
  }, [searchName])

  const search = (e) => {
    e.preventDefault()

    if (!e.target.name.value) {
      return
    }

    setSearchName(e.target.name.value)
    navigate('/search')
    e.target.name.value = ''
  }


  useEffect(() => {
    fetch(`https://mohid-shop.onrender.com/cartProductsCount/${customersEmail}`)
      .then(res => res.json())
      .then(data => setCountCartProducts(parseInt(data.count)))
  }, [customersEmail, countCartProducts])




  return (
    <UserContext.Provider value={{ countCartProducts, setCountCartProducts, searchedProducts, search, loading }}>
      <div>
        <div>
          <Navbar />
        </div>
        <div className=' sm:pt-[100px] pt-[60px]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='category/:categoryName' element={<Category />} />
            <Route path='search' element={<Search />} />

            <Route path='subCategory/:subCategoryName' element={<SubCategory />} />
            <Route path='productDetails/:productId' element={<ProductDetails />} />
            <Route path='cart' element={<RequireAuth><Cart /></RequireAuth>} />
            <Route path='login' element={<Login />} />
            <Route path='signUp' element={<SignUp />} />
            <Route path='checkout' element={<RequireAuth><Checkout /></RequireAuth>} />
            <Route path='payment' element={<RequireAuth><Payment /></RequireAuth>} />

            <Route path='dashboard' element={<RequireAuth><Dashboard /> </RequireAuth>}>
              <Route index='profile' element={<Profile></Profile>}></Route>
              <Route path='MyOrders' element={<MyOrders></MyOrders>}></Route>
              <Route path='AllOrders' element={<RequireAdmin><Orders /></RequireAdmin>}></Route>
              <Route path='form' element={<RequireAdmin><Form /></RequireAdmin>}></Route>
              <Route path='allUser' element={<RequireAdmin><AllUser /></RequireAdmin>}></Route>
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
