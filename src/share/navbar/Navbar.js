import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom'
import auth from '../../firebase.init';
import { AiOutlineShoppingCart, AiOutlineHome, AiOutlineLogin } from 'react-icons/ai'
import { FaRegUser, FaSearch } from 'react-icons/fa'
import { BiChevronRight } from 'react-icons/bi'

import { VscSignOut } from 'react-icons/vsc'
import { useContext } from "react";
import { UserContext } from '../../App';
import url from '../../components/url';


const Navbar = () => {

  const value = useContext(UserContext);
  const [dropdown, setDropdown] = useState(true)
  const [user] = useAuthState(auth)
  const navigate = useNavigate()



  const signedOut = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
    navigate('/logIn');
  }



  const [categories, setCategories] = useState([])

  useEffect(() => {


    fetch(`${url}/getCategoryName`)
      .then(res => res.json())
      .then(data => setCategories(data.data))

  }, [])

  return (

    <div className='sm:h-[110px] h-14 bg-pink-800 fixed z-30 w-full'>

      <div className='sm:h-16 h-14 bg-pink-800 fixed flex justify-between items-center z-30 w-full '>
        <Link className='md:w-1/3' to='/'> <p className=' font-bold py-2 text-white ml-4 sm:text-5xl text-xl'>LG </p></Link>
        <div className='md:w-1/3 w-24'>
          <div className=''>
            <form onSubmit={value.search}>
              <div className='border-[1px] rounded-md px-1 md:w-[315px] w-24 md:h-10 h-6 flex justify-between items-center'>
                <input className='md:pl-2 w-full bg-pink-800 md:h-8 h-5 text-white' name='name' type="text" />
                <button type="submit" className='md:px-3 px-1 md:h-8 h-3 font-xl text-white md:bg-pink-700 rounded-md ml-1'><FaSearch /></button>
              </div>
            </form>
          </div>
        </div>

        {/* menu for desktop device */}
        <div className='md:flex justify-end hidden md:w-1/3'>

          {user && <Link className='' to='dashboard'><p className='sm:mx-3 mx-1 my-3 px-3 text-2xl font-bold text-white'><FaRegUser /></p></Link>}

          <Link to='/'> <p className='sm:mx-3 mx-1 my-3 px-3 text-2xl font-bold text-white'><AiOutlineHome /></p></Link>

          <Link to='/cart'> <div className='sm:mx-3 mx-1 my-3 px-3 text-2xl font-bold text-white flex'><AiOutlineShoppingCart /> <p className='font-normal text-sm'><sup>{value.countCartProducts}</sup></p> </div> </Link>

          {user ? <button className='sm:mx-3 mx-1 my-3 px-3 text-2xl font-bold text-white' onClick={signedOut}><VscSignOut /></button> : <Link to="/login"><button className='sm:mx-3 mx-1 my-3 px-3 text-2xl font-bold text-white' ><AiOutlineLogin /></button></Link>}
        </div>
        {/* sidebar for mobile  device */}
        <svg className="md:hidden sharebtn hover:border-white border-pink-800 mr-4 p-2" onClick={() => setDropdown(!dropdown)} width='32px' fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>

        <div className={dropdown ? 'bg-pink-600  md:hidden fixed sm:top-24 top-14 w-64  text-white z-30 -right-64 transition-all duration-700' : ' bg-pink-600 md:hidden fixed sm:top-24 top-14 w-64 right-0 text-white z-30 transition-all duration-700'} >

          {user && <Link to='dashboard'>  <p onClick={() => setDropdown(true)} className=" border hover:border-white px-2 mx-2 border-pink-700  my-2 flex h-10 items-center"><FaRegUser /> <span className='ml-4'>Dashboard</span> </p></Link>}
          <Link to='/'><p onClick={() => setDropdown(true)} className=" border hover:border-white px-2 mx-2 border-pink-700  my-2 flex h-10 items-center"><AiOutlineHome /> <span className='ml-4'>Home </span></p></Link>
          <Link to='/cart'><p onClick={() => setDropdown(true)} className=" border hover:border-white px-2 mx-2 border-pink-700  my-2 flex h-10 items-center"><AiOutlineShoppingCart /> <span className='ml-4'>Cart<sup>{value.countCartProducts}</sup></span></p></Link>
          <Link to='/search'><p onClick={() => setDropdown(true)} className=" border hover:border-white px-2 mx-2 border-pink-700  my-2 flex h-10 items-center"><FaSearch /> <span className='ml-4'>Search</span></p></Link>

          {user ? <button className='border hover:border-white px-2 mx-2 border-pink-700  my-2 flex h-10 items-center w-full' onClick={() => {
            signedOut()
            setDropdown(true)
          }}><VscSignOut /><span className='ml-4'>Logout</span></button> : <Link to="/login"><button className='border hover:border-white px-2 mx-2 border-pink-700  my-2 flex h-10 items-center w-full' ><AiOutlineLogin /> <span className='ml-4'>Login</span></button></Link>}

        </div>


      </div>


      <div className='w-48 bg-white mt-[62px] group/item z-50'>
        <p className='pl-4 py-3 text-white bg-pink-800  hover:bg-pink-700'>Categories</p>
        <ul className='pl-4 hidden group-hover/item:block'>
          {categories.map((c) => (
            <li key={c.id} className='group  px-2 py-1 my-1 hover:font-bold relative'>
            <Link to={`/${c.categoryName}`}> <div className='flex justify-between items-center group/list'> <span>{c.categoryName}</span> <BiChevronRight className='hidden font-bold group-hover/list:block' /></div></Link>
              {JSON.parse(c.subCategoryName).length !== 0 && (
                <div>
                  <ul className='absolute bg-white hidden group-hover:block w-32 -top-1 left-[175px] z-30 px-2'>
                    {JSON.parse(c.subCategoryName).map((c) => (
                     <Link key={c}  to={`/sub/${c}`}> <li className='p-1 bg-white font-normal hover:font-bold'>  {c} </li></Link>))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}




export default Navbar