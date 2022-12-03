import React from 'react'
import { useQuery } from 'react-query';
import UserRow from './UserRow';

const AllUser = () => {


  const { isLoading, data: users ,refetch} = useQuery('users', () =>
    fetch(`  http://localhost:5000/user`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then(res => res.json())
  )

  if (isLoading) return <p className='min-h-[600px]'>Loading</p>

  return (
    <div className='min-h-[600px]'>
    

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

            {users.map(user => <UserRow key={user._id} user={user} refetch={refetch}></UserRow>)}

          </tbody>
        </table>
      </div>
    </div>

  )
}


export default AllUser