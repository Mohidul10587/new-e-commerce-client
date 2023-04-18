import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../App';
import url from '../components/url';
const ProductDetails = () => {
  const value = useContext(UserContext);


  const query = useParams()
  const productId = query.productId;

  const navigate = useNavigate()


  const { data: product, isLoading } = useQuery('product', () => fetch(`${url}/product/${productId}`).then(res => res.json()))
  const addToCart = () => {

  


    // fetch(`${url}/cart/${user.email}`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json',

    //   },
    //   body: JSON.stringify({
    //     name: product.data[0].name,
    //     price: product.data[0].priceOfUnit,
    //     category: product.data[0].categoryName,
    //     subCategoryName: product.data[0].subCategoryName,
    //     img: product.data[0].img,
    //     quantity: 1,
    //     customersEmail: user.email
    //   })
    // })
    //   .then(res => res.json())
    //   .then(inserted => {
    //     if (inserted.result === 'fail') {
    //       toast.error('Product is already added')
    //     }
    //     else { 
    //       value.setCountCartProducts(value.countCartProducts+1)
    //       toast.success('Added successfully') }
    //   })
  }




  if (isLoading) {
    return <div className='min-h-[600px] flex justify-center font-bold text-3xl mt-10'> <p>Loading...</p></div>

  }
  return (
    <div className='min-h-[600px]'>
      <h1 className='text-3xl text-center mt-10'>Product Details</h1>
      <div className='flex justify-center mt-10'>
        <div className=' border-2 border-pink-900 overflow-hidden rounded-lg w-10/12  sm:flex py-8'>
          <img className='sm:w-1/2 sm:h-80' src={`${url}/uploads/${product.data[0].img}`}alt="" />
          <div className='sm:p-10 p-2 relative sm:w-1/2 sm:border-l-[1px] border-pink-700'>
            <p className='text-lg font-bold'>{product.data[0].name}</p>
            <p className='text-2xl font-bold mt-2'>${product.data[0].priceOfUnit}</p>
            <div>
              <button className='rounded-lg mt-2 px-3 py-2 bg-pink-500  text-white w-32 sm:mb-0 mb-3' onClick={addToCart}>Add to curt </button>
            </div>
            <p  className='mt-2 font-bold'>Products Details</p>
            <p>💝Just awesome💝 Totally impressed❤️ Quality 100%👌 & same as picture. Product received as per as seller commitment. Thanks and highly recommend ❤️❤️ </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ProductDetails