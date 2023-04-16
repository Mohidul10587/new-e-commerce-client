import React from 'react'
import { useQuery } from 'react-query';

import url from '../../components/url';

const AllUser = () => {


  const { isLoading, data: users, refetch } = useQuery('users', () =>
    fetch(`${url}/getAllUsers`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then(res => res.json())
  )

  if (isLoading) return <p className='min-h-[600px]'>Loading</p>
  console.log(users)
  return (
    <div className='min-h-[600px]'>
      <p className='text-7xl'> </p>

      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead className='border-[1px] border-pink-700'>
            <tr >
              <th className='border-[1px] border-pink-700 text-center text-base'>User Email</th>
              <th className='border-[1px] border-pink-700 text-center text-base'>User Roll</th>
              <th className='border-[1px] border-pink-700 text-center text-base'>Remove</th>


            </tr>
          </thead>
          <tbody>

            {users.data.map(user => <tr className='border-[1px] border-pink-700'>
              <td className='border-[1px] border-pink-700'>{user.email}</td>
              <td className='border-[1px] border-pink-700'>{user.roll !== 'admin' ? <button  className="text-white rounded-md py-1 px-2 bg-pink-700">Make Admin</button> : <p className='ml-5 font-bold'>Admin</p>} </td>
              <td className='border-[1px] border-pink-700'><button className="text-white rounded-md py-1 px-2 bg-pink-700">Remove User</button></td>

            </tr>)}

          </tbody>
        </table>
      </div>
    </div>

  )
}


export default AllUser