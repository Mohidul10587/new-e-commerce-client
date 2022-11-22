import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from 'react-query'
import { Link, Outlet } from 'react-router-dom'
import auth from '../../firebase.init'
import useAdmin from '../../hooks/useAdmin'



const Dashboard = () => {

  const [user] = useAuthState(auth)
  const [admin] = useAdmin(user)







  return (
  <div>

      <div className=''>
      <div className="drawer drawer-mobile">
        <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">

      
          <div className='ml-8'>
          <Outlet></Outlet>

          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-72 bg-pink-600 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li className='mb-2 bg-white rounded-md'> <Link to='/dashboard'>Profile</Link></li>
            <li className='mb-2 bg-white rounded-md'> <Link to='/dashboard/MyOrders'>My Orders</Link></li>
           {admin && <div>
            
            <li className='mb-2 bg-white rounded-md'> <Link to='/dashboard/AllOrders'>All Orders</Link></li>
            <li className='mb-2 bg-white rounded-md'> <Link to='/dashboard/form'>Upload Products</Link></li>
            <li className='mb-2 bg-white rounded-md'> <Link to='/dashboard/allUser'>All User</Link></li>
            </div>}

          </ul>

        </div>
      </div>

    </div>
  </div>
  )
}

export default Dashboard




{/* */}