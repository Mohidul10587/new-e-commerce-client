import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import url from '../../components/url';


const CreateCategory = () => {

  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState([])
  const [categoryName2, getCategoryName] = useState('')

  useEffect(() => {
    fetch(`${url}/getCategoryName`)
      .then(res => res.json())
      .then(data => setCategories(data.data))
  }, [])


  const handleForm = async (e) => {
    e.preventDefault();
    await fetch(`${url}/createCategory`, {
      method: "POST",
      body: JSON.stringify({ categoryName: categoryName, subCategory: [] }),
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => res.json())
      .then(data => {
        if (data.status === 201) {
          toast.success('Category Successfully created')
        } else {
          console.log("error");
        }
      })
      .catch(error => console.log(error));
  };


  const makeSubCategory = async (e) => {
    e.preventDefault()
    console.log(e.target.subCategory.value, categoryName2)
    const updateSubCreateCategory = JSON.parse(categories.find(c => c.categoryName === categoryName2).subCategoryName)
    updateSubCreateCategory.push(e.target.subCategory.value)

    await fetch(`${url}/updateSubCreateCategory/${categoryName2}`, {
      method: "PUT",
      body: JSON.stringify({ updateSubCreateCategory: updateSubCreateCategory }),
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.status === 200) {
          toast.success('Category Successfully created')
        } else {
          console.log("error");
        }
      })
      .catch(error => console.log(error));



  }



  return (
    <div>
      <h1 className='text-center text-xl font-bold mb-3'>Create Category</h1>
      <form onSubmit={handleForm} className="max-w-md mx-auto  border-[1px] border-pink-400 p-4 rounded">

        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-gray-700 font-bold mb-2"> Category Name</label>
          <input className='border-2 p-2 border-black rounded w-full' type="text" id="categoryName" name="categoryName" onChange={(e) => setCategoryName(e.target.value)} required />
        </div>


        <div className="flex items-center justify-center">
          <button type="submit" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create</button>
        </div>
      </form>


      <div className=''>
        <div className='pl-4 mt-4'>
          {
            categories.map(c => <form key={c.id} onSubmit={makeSubCategory} className='flex mt-1'>

              <div>
                <p className='px-2  border-[1px] border-black w-32 h-8'>{c.categoryName}</p>
                <ul>
                  {JSON.parse(c.subCategoryName).map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <input type="text" className='border-[1px] px-1 border-black rounded ml-2 h-8' name='subCategory' onChange={() => getCategoryName(c.categoryName)} required />



              <button type='submit' className='px-2  border-[1px] border-black ml-2 rounded h-8' >Submit</button>
            </form>)
          }
        </div>
      </div>

    </div>
  )
}

export default CreateCategory