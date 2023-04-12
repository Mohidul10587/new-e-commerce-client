
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import url from '../../components/url';

const UploadProducts = () => {
    const [fname, setFName] = useState("");
    const [file, setFile] = useState("");
    const [unit, setUnit] = useState('')
    const [priceOfUnit, setPriceOfUnit] = useState('')
    const [data, setData] = useState([])
    const [catName, setCatName] = useState([])

    const categoryNameRef = useRef();


    useEffect(() => {


        fetch(`${url}/getCategoryName`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(res => res.json()).then(data => {

            setData(data.data)
            setCatName(JSON.parse(data.data[0].subCategoryName))
        }
        )


    }, [])

    const setCategoryId = (e) => {
        const cName = data.find(d => d.categoryName === e)
        const sub = JSON.parse(cName.subCategoryName)
        setCatName(sub)
    }
    const handleForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", file);
        formData.append("fname", fname);
        formData.append("categoryName", categoryNameRef.current.value);
        formData.append("subCategoryName", e.target.subCategoryName.value);
        formData.append("unit", unit);
        formData.append("priceOfUnit", priceOfUnit);
        const headers = new Headers();
        // headers.append("Authorization", "Bearer " + 'token'); // replace with your token if needed
        console.log(categoryNameRef.current.value, e.target.subCategoryName.value)


        await fetch(`${url}/addProduct`, {
            method: "POST",
            body: formData,
            headers: headers,
        }).then(res => res.json())
            .then(data => {
                if (data.status === 201) {
                    toast.success('Product Successfully added')
                } else {
                    toast.error('Product do not added')
                }
            })
            .catch(error => console.log(error));


    };

    return (
        <>
            <div>
                <h1 className='text-center text-xl font-bold mb-3'>Create Category</h1>
                <form onSubmit={handleForm} className="max-w-md mx-auto  border-[1px] border-pink-400 p-4 rounded">
                    <div className="mb-4">
                        <label htmlFor="fname" className="block text-gray-700 font-bold mb-2"> Product Name</label>
                        <input className='border-2 p-2 border-black rounded w-full' type="text" id="fname" name="fname" onChange={(e) => setFName(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categoryName" className="block text-gray-700 font-bold mb-2"> Category Name</label>
                        <select className='border-2 p-2 border-black rounded w-full' type="text" id="categoryName" name="categoryName" onChange={(e) => 
                            setCategoryId(e.target.value)}  ref={categoryNameRef} required >

                            {
                                data.map(d => <option value={d.categoryName}  key={d.id}> {d.categoryName}</option>)
                            }

                        </select>
                    </div>



                    <div className="mb-4">
                        <label htmlFor="subCategoryName" className="block text-gray-700 font-bold mb-2">Sub Category Name</label>
                        <select className='border-2 p-2 border-black rounded w-full' type="text" id="subCategoryName" name="subCategoryName" required >
                            {
                                catName.map(d => <option value={d} key={d}> {d}</option>)
                            }

                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="unit" className="block text-gray-700 font-bold mb-2"> Unit</label>
                        <input className='border-2 p-2 border-black rounded w-full' type="text" id="unit" name="unit" onChange={(e) => setUnit(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="priceOfUnit" className="block text-gray-700 font-bold mb-2">Price Of Unit</label>
                        <input className='border-2 p-2 border-black rounded w-full' type="text" id="priceOfUnit" name="priceOfUnit" onChange={(e) => setPriceOfUnit(e.target.value)} required />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">Product Image</label>
                        <input type="file" id="photo" name="photo" onChange={(e) => setFile(e.target.files[0])} className='border-2 p-2 border-black rounded w-full' required />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                </form>

            </div>

        </>
    )
}

export default UploadProducts