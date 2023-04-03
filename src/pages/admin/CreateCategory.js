import React, { useState } from 'react'
import { toast } from 'react-toastify';

const CreateCategory = () => {
    const [fname, setFName] = useState("");
    const [file, setFile] = useState("");



    // const createCategory = async (e) => {
    //     e.preventDefault();

    //     var formData = new FormData();
    //     formData.append("photo", file)
    //     formData.append("fname", fname);



    //     fetch("http://localhost:8004/register", {
    //         method: 'POST',
    //         body: formData,
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //             'Authorization': 'Bearer token' // replace with your token if needed
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.status === 201) {
    //                 toast.success('Category Successfully created')
    //             } else {
    //                 console.log("error");
    //             }
    //         })
    //         .catch(error => console.log(error));

    // }


    const createCategory = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", file);
        formData.append("fname", fname);

        const headers = new Headers();
        // headers.append("Authorization", "Bearer " + 'token'); // replace with your token if needed



        await fetch("http://localhost:8004/register", {
            method: "POST",
            body: formData,
            headers: headers,
        })

            .then(res => res.json())
            .then(data => {
                if (data.status === 201) {
                    toast.success('Category Successfully created')
                } else {
                    console.log("error");
                }
            })
            .catch(error => console.log(error));


    };

    return (
        <>
            <div>
                <h1 className='text-center text-xl font-bold mb-3'>Create Category</h1>
                <form onSubmit={createCategory} className="max-w-md mx-auto  border-[1px] border-pink-400 p-4 rounded">
                    <div className="mb-4">
                        <label htmlFor="fname" className="block text-gray-700 font-bold mb-2"> Category Name</label>
                        <input className='border-2 p-2 border-black rounded w-full' type="text" id="fname" name="fname" onChange={(e) => setFName(e.target.value)}  />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">Photo</label>
                        <input type="file" id="photo" name="photo" onChange={(e) => setFile(e.target.files[0])} className='border-2 p-2 border-black rounded w-full' />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default CreateCategory