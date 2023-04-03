import React, { useContext } from 'react'
// import { loadStripe } from '@stripe/stripe-js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { UserContext } from '../../App';
import auth from '../../firebase.init';
// const stripePromise = loadStripe('pk_test_51MSFzbGk3QfbJiMcAMdawDS9s63H0pHuUBObNkwMUVVB87OtENGrkvFKz5R4hqW5rsdUXYQ6afb95srcz0AsMImM00j8ivRv40');

const Checkout = () => {
  const value = useContext(UserContext);
  const [user] = useAuthState(auth)
  const customersEmail = user?.email;
  const { data: products, refetch } = useQuery(['products', customersEmail], () => fetch(`https://mohid-shop.onrender.com/cart/${customersEmail}`).then(res => res.json()))

  const { register, formState: { errors }, handleSubmit, reset } = useForm();







  // Total price calculation






  const onSubmit = async data => {



    const getTotalPrice = () => {
      let total = 0;
      for (let i = 0; i < products?.length; i++) {
        total = total + parseInt(products[i].price) * parseInt(products[i].quantity)

      }
      return total;
    }
    const totalPrice = getTotalPrice()


    // // Shipping charge calculation
    const shippingCharge = Math.round(totalPrice * 0.05)

    // // Sub total calculation

    const subTotal = shippingCharge + totalPrice;

  


    const order = {
      name: data.name,
      phone: data.phone,
      customersEmail: customersEmail,
      address: data.address,
      city: data.city,
      zip_code: data.zip_code,
      bkashNumber: data.bkashNumber,
      amount: data.amount,
      trxID: data.trxID,
      onlyProductsPriceTotal: totalPrice,
      shippingCharge:shippingCharge,
      totalRequiredPrice: subTotal,
      orderedProduct: products,
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      date: new Date().getDate(),

    }

    fetch('https://mohid-shop.onrender.com/orderedVoucher', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(inserted => {
        console.log(inserted)
        toast.success('Address ')
        reset()
      })


      fetch('https://mohid-shop.onrender.com/orderedVoucherForAdmin', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(order)
      })
        .then(res => res.json())
        .then(inserted => {
          console.log(inserted)
          toast.success('Address ')
          reset()
        })
    fetch(`https://mohid-shop.onrender.com/cart2/${customersEmail}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {

        if (data.deletedCount) {

          toast.success(`Cart Items is removed`)
          refetch()
          value.setCountCartProducts(0)
        }
      })
  }



  return (
    <div className='min-h-[600px]'>


      <h1 className='text-center text-2xl font-bold mb-6 mt-10'>Add a shipping address</h1>
      <div className='flex justify-center px-4'>
        <form className='w-[800px]' onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Name</span>

            </label>
            <input

              type="text"
              placeholder="Name"
              className="input input-bordered border-black w-full "

              {...register("name", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />

            <label className="label">

              {errors.name?.type === 'required' && <span className='text-red-500'>{errors.name?.message}</span>}

            </label>

          </div>
          {/* Phone */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Phone Number</span>

            </label>
            <input

              type="number"
              placeholder="Phone"
              className="input input-bordered border-black w-full "

              {...register("phone", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />

            <label className="label">

              {errors.phone?.type === 'required' && <span className='text-red-500'>{errors.price?.message}</span>}

            </label>

          </div>


          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input

              type="text"
              placeholder="Address"
              className="input input-bordered border-black w-full "

              {...register("address", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />

            <label className="label">

              {errors.address?.type === 'required' && <span className='text-red-500'>{errors.category?.message}</span>}

            </label>
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">City</span>

            </label>
            <input

              type="text"
              placeholder="City"
              className="input input-bordered border-black w-full "

              {...register("city", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />
            <label className="label">
              {errors.city?.type === 'required' && <span className='text-red-500'>{errors.sub_category?.message}</span>}

            </label>
          </div>


          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Zip Code</span>

            </label>
            <input

              type="number"
              placeholder="Zip Code"
              className="input input-bordered border-black w-full "

              {...register("zip_code", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />
            <label className="label">
              {errors.zip_code?.type === 'required' && <span className='text-red-500'>{errors.sub_category?.message}</span>}

            </label>
          </div>


          <h1 className='text-center text-2xl font-bold md:mb-6 '>Payment</h1>
          <p> Send your money to this merchant bkash account 017xxxxxxxx ; Put the sender bkash number , amount of money and TrxID in the input box</p>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Phone Number</span>

            </label>
            <input

              type="number"
              placeholder="Your bkash Number"
              className="input input-bordered border-black w-full "

              {...register("bkashNumber", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />

            <label className="label">

              {errors.phone?.type === 'required' && <span className='text-red-500'>{errors.price?.message}</span>}

            </label>

          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Amount of money</span>

            </label>
            <input

              type="number"
              placeholder="Amount of money"
              className="input input-bordered border-black w-full "

              {...register("amount", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />

            <label className="label">

              {errors.phone?.type === 'required' && <span className='text-red-500'>{errors.price?.message}</span>}

            </label>

          </div>
          {/* Transaction Id or TrxID */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Transaction Id or TrxID</span>

            </label>
            <input

              type="number"
              placeholder="Transaction Id or TrxID"
              className="input input-bordered border-black w-full "

              {...register("trxID", {
                required: {
                  value: true,
                  message: 'This is required field'
                }

              })} />

            <label className="label">

              {errors.phone?.type === 'required' && <span className='text-red-500'>{errors.price?.message}</span>}

            </label>

          </div>
          <button

            type="submit"
            className="rounded-lg py-3 px-6 border-2 border-pink-700 hover:bg-pink-800 hover:text-white w-full text-4xl mt-10">Place Order</button>


        </form>
      </div>
    </div>
  )
}

export default Checkout