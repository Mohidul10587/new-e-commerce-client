import React, { useEffect, useState } from 'react'
import url from '../../components/url';


const Home2 = () => {

    const [data, setData] = useState([]);


    const getUserData = async () => {
        await fetch(`${url}/products`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                if (data.status === 201) {
                    console.log(data.data);
                    setData(data.data)

                } else {
                    console.log("error")
                }
            })

    }



    useEffect(() => {
        getUserData()
    }, [])

    function handleDelete(id) {
        console.log(id)
    }
    return (
        <>
            <div className='pr-2'>
                <div className='flex justify-between items-center px-4 py-2 rounded border-[1px] border-teal-600 mt-2'>
                    <p className='w-24 text-start'>Img</p>
                    <p className='w-24 text-start'>Name</p>
                    <p className='w-24 text-start'>Price</p>
                    <p className='w-24 text-start'>Show</p>
                    <p className='w-24 text-center'>X</p>

                </div>
                {data.map(d => <div key={d.id} className='flex justify-between items-center px-4 py-2 rounded border-[1px] border-teal-600 mt-2'>
                    <div className='w-24 '> <img className='h-14 w-14 rounded-full p-2 border-[1px] border-teal-700' src={`${url}/uploads/${d.img}`} alt="" /></div>
                    <p className='w-24 text-start'>{d.name}</p>
                    <p className='w-24 text-start'>$ {d.priceOfUnit}</p>
                    <p className='w-24 text-start'>Show In Home Page</p>
                    <button className="border-2 border-black rounded px-2 py-1"><label htmlFor="my-modal" >Delete</label></button>

                    
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-center">Are you sure to delete ?</h3>
                            <div className="modal-action justify-center">

                                <div className='flex justify-center mt-4'>
                                    <label onClick={() => handleDelete(d.id)} htmlFor="my-modal" className="border-2 border-black rounded px-4 py-1">Yes</label>
                                    <label className="border-2 border-black rounded px-4 py-1 ml-3" htmlFor="my-modal" >No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </>
    )
}

export default Home2