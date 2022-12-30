import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../../App'


import auth from '../../firebase.init'


const Cart = () => {
  const value = useContext(UserContext);

  const [user] = useAuthState(auth)
  const customersEmail = user?.email;
  const { data: products, isLoading, refetch } = useQuery(['products', customersEmail], () => fetch(`https://mohid-shop.onrender.com/cart/${customersEmail}`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
  }).then(res => res.json()))



  // Total price calculation

  const getTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < products?.length; i++) {
      total = total + parseInt(products[i].price) * parseInt(products[i].quantity)
    }
    return total;
  }
  const totalPrice = getTotalPrice()


  // Shipping charge calculation
  const shippingCharge = Math.round(totalPrice * 0.05)

  // Sub total calculation

  const subTotal = shippingCharge + totalPrice;


  // increase quantity


  const increase = (id, p) => {

    fetch(`https://mohid-shop.onrender.com/cart/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: p.name,
        price: p.price,
        category: p.category,
        sub_category: p.sub_category,
        img: p.img,
        quantity: p.quantity + 1,
        customersEmail: user.email
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.modifiedCount) {
          refetch()
          value.setCountCartProducts(value.countCartProducts+1)
        }
      })


  }


  const decrease = (id, p) => {

if(p.quantity > 1){


    fetch(`https://mohid-shop.onrender.com/cart/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: p.name,
        price: p.price,
        category: p.category,
        sub_category: p.sub_category,
        img: p.img,
        quantity: p.quantity - 1,
        customersEmail: user.email
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.modifiedCount) {
          refetch()
          value.setCountCartProducts(value.countCartProducts-1)
        }
      })

}
else{
  alert('If  You want to remove the  product please press delete button')
}

  }



  // Delete a cart item

  const handleDelete = (id, name,quantity) => {

    fetch(`https://mohid-shop.onrender.com/cart/${id}`, {
      method: 'DELETE',

    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.deletedCount) {
          value.setCountCartProducts(value.countCartProducts-quantity)
          toast.success(`${name} is deleted`)
          refetch()
        }
      })
  }

  if (isLoading) {
    return <div className='min-h-[600px] flex justify-center font-bold text-3xl mt-10'> <p>Loading...</p></div>
  }
  if (products.length === 0) return <div className='min-h-[600px] text-center font-bold mt-10 text-2xl'> <p>Sorry you do not add any product to cart. Please add  products to cart first.</p></div>

  return (

    <div className='min-h-[600px]'>
      <h1 className='text-center font-bold text-3xl mt-10'>Cart</h1>

      <div className='sm:flex mt-10 px-2'>
        <table className='sm:w-1/2'>
          <thead className='border-[1px] border-pink-700'>
            <tr>
              <th className='w-24 text-center'>Img</th>
              <th className='w-24 text-center'>Name</th>
              <th className='w-24 text-center'>Price</th>
              <th className='w-24 text-center'>Quantity</th>
              <th className='w-24 text-center'>Delete</th>
            </tr>
          </thead>
          <tbody className=''>
            {products.map(p => <tr key={p._id} className='border-[1px] border-pink-700'>
              <td className='text-center'><img className='sm:w-16 w-10 h-10 sm:h-14 m-[1px] rounded-md border-[1px] sm:p-2 border-pink-700 sm:ml-4' src={p.img} alt="" /></td>
              <td className='text-center'>{p.name}</td>
              <td className='text-center'>${p.price}</td>
              <td className='text-center'><button className='sm:px-3  px-2 font-bold border-pink-600 ' onClick={() => decrease(p._id, p)}>-</button><span className=''>{p.quantity}</span> <button className='sm:px-3  px-2 font-bold  border-pink-600 r' onClick={() => increase(p._id, p)}>+</button></td>
              <td className='text-center'><button className='bg-red-700 px-2 py-1 text-white rounded-md' onClick={() => handleDelete(p._id, p.name ,p.quantity)}>Delete</button></td>
            </tr>
            )}
          </tbody>
        </table>
        <div className='sm:w-1/2  flex justify-center sm:ml-1 sm:mt-0 mt-4'>
          <div className='border-[1px] border-pink-700 sm:p-4 p-2 w-full'>
            <h1 className='text-xl font-bold'> Order summary</h1>
            <div className='font-bold w-44 flex justify-between'><p >Total Items:</p> <p>$ {products.length}</p></div>
            <div className='font-bold w-44 flex justify-between'><p >Total Price:</p> <p>$ {totalPrice}</p></div>
            <div className='font-bold w-44 flex justify-between'><p >Shipping Charge:</p> <p>$ {shippingCharge}</p></div>
            <div className='font-bold w-44 flex justify-between'><p >Sub Total  :</p> <p>$ {subTotal}</p></div>
            <div className='flex justify-center mt-6'>
              <button className='text-center w-full px-2 py-1 bg-pink-500 text-white rounded-md  text-sm'>  <Link to='/checkout'>Send Order</Link></button>
            </div>
            <div className='flex justify-center mt-2'>
              <button className='text-center px-2 py-1 w-full bg-pink-500 text-white rounded-md  text-sm'>  <Link to='/'>Continue Shopping</Link></button>
            </div>

          </div>
        </div>
      </div>

    </div>



  )
}

export default Cart