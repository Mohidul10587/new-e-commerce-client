

import { Link } from 'react-router-dom';

import url from '../../components/url';
import React, { useState } from 'react';
const SignUp = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    async function handleRegister() {
        try {
            const response = await fetch(`${url}/userRegister`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name, email, password }),
            });
            const data = await response.json();
          
            alert(data.user)
          
        } catch (error) {
            setError('Error registering user');
        }
    }

   

    async function handleMe() {
        try {
            const response = await fetch('http://localhost:3000/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            setError('Error getting user information');
        }
    }

    return (<div className='flex justify-center items-center pt-24'>
        <div className="card w-96 bg-base-100 shadow-pink-600 shadow-xl border-[1px] border-pink-500">
            <div className="card-body">
                <h2 className="text-center text-xl">Sign Up</h2>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input className="input input-bordered border-black w-full max-w-xs" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>

                    </label>
                    <input className="input input-bordered border-black w-full max-w-xs" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input className="input input-bordered border-black w-full max-w-xs" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-outline w-full hover:bg-pink-700" onClick={handleRegister}>register</button>
                <small>Already have an account ?<Link className='text-pink-700 ml-4' to='/logIn'>Go to Login</Link></small>
            </div>
        </div>
    </div>

    )
}

export default SignUp