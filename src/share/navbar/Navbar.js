import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom'
import auth from '../../firebase.init';
import { AiOutlineShoppingCart, AiOutlineHome, AiOutlineLogin} from 'react-icons/ai'
import { FaRegUser, FaSearch } from 'react-icons/fa'
import { VscSignOut } from 'react-icons/vsc'
import { useContext } from "react";
import { UserContext } from '../../App';


const Navbar = () => {

  const value = useContext(UserContext);
  const [dropdown, setDropdown] = useState(true)
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  const [first, setFirst] = useState(true)
  const [second, setSecond] = useState(true)
  const [third, setThird] = useState(true)

  window.onclick = function (event) {
    if (!event.target.matches('.sharebtn')) {
      setDropdown(true)

    }
  }

  const signedOut = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
    navigate('/logIn');
  }

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





        {/* category and subcategories for mobile */}

        <li className=' group text-white list-none md:hidden'><span className='font-bold'>Category</span>
          <div className='hidden group-hover:block group fixed  top-14 pt-2 left-0 text-center w-full  bg-pink-500  '>

            <div >
              <ul className='flex justify-between w-full px-4'>
                <li onClick={() => {
                  setFirst(!first)
                  setSecond(true)
                  setThird(true)
                }}><span className='font-bold border-b-[2px] border-white pb-1'>For Women</span>

                  <ul className={first ? 'hidden' : 'block'}>

                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Clothing'>Clothing</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Winter Special'>Winter Special</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Muslim Were'>Muslim Were</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Shoes'>Shoes</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Watches'>Watches</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Jewellers'>Jewellers</Link></li>

                  </ul>

                </li>
                <li onClick={() => {
                  setSecond(!second)
                  setFirst(true)
                  setThird(true)
                }}><span className='font-bold border-b-[2px] border-white pb-1'>Heaths</span>


                  <ul className={second ? 'hidden' : 'block'}>

                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Bath and Body'>Bath and Body</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Beauty Tools'>Beauty Tools</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Fragrance'>Fragrance</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Hair Care'>Hair Care</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Makeup'>Makeup</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Mens Care'>Men's Care</Link></li>

                  </ul>
                </li>

                <li onClick={() => {
                  setThird(!third)
                  setFirst(true)
                  setSecond(true)
                }}><span className='font-bold border-b-[2px] border-white pb-1'>Watches</span>

                  <ul className={third ? 'hidden' : 'block'}>

                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Kids'>Kids</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Laptop'>Laptop</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Luggage'>Luggage</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Travel Bags'>Travel Bags</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Mens Bags'>Mens Bags</Link></li>
                    <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Womens Bags'>Womens Bags</Link></li>

                  </ul>

                </li>

              </ul>
            </div>
          </div>

        </li>



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


      {/* category and subcategories */}



      <ul className='md:flex hidden justify-center fixed top-16 w-full z-30 font-bold'>
        <li className='py-1 text-center   group text-white mx-5 relative'> <Link to='/category/Women Fashion'>Women's Fashion</Link>

          <div className='-left-11 top-[32px] absolute bg-pink-800 pt-[14px] rounded rounded-b-md'>
            <ul className='hidden group-hover:block bg-pink-600 text-white  pt-4 px-2  pb-2 rounded rounded-b-md w-56 '>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Clothing'>Clothing</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Winter Special'>Winter Special</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Muslim Were'>Muslim Were</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Shoes'>Shoes</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Watches'>Watches</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Jewellers'>Jewellers</Link></li>

            </ul>
          </div>
        </li>
        <li className='py-1 text-center  group text-white mx-5 relative'><Link to='/category/Healths and Beauty'>Heath and Beauty</Link>
          <div className='-left-11 top-[32px] absolute bg-pink-800 pt-[14px] rounded rounded-b-md'>
            <ul className='hidden group-hover:block bg-pink-600 text-white  pt-4 px-2  pb-2 rounded rounded-b-md w-56 '>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Bath and Body'>Bath and Body</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Beauty Tools'>Beauty Tools</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Fragrance'>Fragrance</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Hair Care'>Hair Care</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Makeup'>Makeup</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Mens Care'>Men's Care</Link></li>

            </ul>
          </div>
        </li>
        <li className='py-1 text-center  group text-white mx-5 relative'><Link to='/category/Watches'>Watches and Bags</Link>
          <div className='-left-11 top-[32px] absolute bg-pink-800 pt-[14px] rounded rounded-b-md'>
            <ul className='hidden group-hover:block bg-pink-600 text-white  pt-4 px-2  pb-2 rounded rounded-b-md w-56 '>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Kids'>Kids</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Laptop'>Laptop</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Luggage'>Luggage</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Travel Bags'>Travel Bags</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Mens Bags'>Mens Bags</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Womens Bags'>Womens Bags</Link></li>

            </ul>
          </div>
        </li>
        <li className='py-1 text-center group text-white mx-5 relative'> <Link to='/category/Women Fashion'>Women's Fashion</Link>

          <div className='-left-11 top-[32px] absolute bg-pink-800 pt-[14px] rounded rounded-b-md'>
            <ul className='hidden group-hover:block bg-pink-600 text-white  pt-4 px-2  pb-2 rounded rounded-b-md w-56 '>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Clothing'>Clothing</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Winter Special'>Winter Special</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Muslim Were'>Muslim Were</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Shoes'>Shoes</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Watches'>Watches</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Jewellers'>Jewellers</Link></li>

            </ul>
          </div>
        </li>
        <li className='py-1 text-center group text-white mx-5 relative'><Link to='/category/Healths and Beauty'>Heath and Beauty</Link>
          <div className='-left-11 top-[32px] absolute bg-pink-800 pt-[14px] rounded rounded-b-md'>
            <ul className='hidden group-hover:block bg-pink-600 text-white  pt-4 px-2  pb-2 rounded rounded-b-md w-56 '>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Bath and Body'>Bath and Body</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Beauty Tools'>Beauty Tools</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Fragrance'>Fragrance</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Hair Care'>Hair Care</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Makeup'>Makeup</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Mens Care'>Men's Care</Link></li>

            </ul>
          </div>
        </li>
        <li className='py-1 text-center  group text-white mx-5 relative'><Link to='/category/Watches'>Watches and Bags</Link>
          <div className='-left-11 top-[32px] absolute bg-pink-800 pt-[14px] rounded rounded-b-md'>
            <ul className='hidden group-hover:block bg-pink-600 text-white  pt-4 px-2  pb-2 rounded rounded-b-md w-56 '>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Kids'>Kids</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Laptop'>Laptop</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Luggage'>Luggage</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Travel Bags'>Travel Bags</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Mens Bags'>Mens Bags</Link></li>
              <li className='py-1 text-center hover:text-pink-500 hover:bg-white'> <Link to='/subCategory/Womens Bags'>Womens Bags</Link></li>

            </ul>
          </div>
        </li>
      </ul>

    </div>
  )
}




export default Navbar