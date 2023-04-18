import { Link, useNavigate } from 'react-router-dom';
import url from '../../components/url';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';


const Login = () => {
  const navigate = useNavigate()
  const value = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    try {
      const response = await fetch(`${url}/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      }
      if (data.token) {

        fetch(`${url}/me`, {
          method: 'GET',
          headers: { authorization: `Bearer ${data.token}` },

        }).then(res => res.json())
          .then(data => {

            if (data.email) {

              value.setUser(true)
              localStorage.setItem('accessToken', data.token);
              navigate('/')
            }
          }).catch(error => {
            value.setUser(false)
          });


      }
    } catch (error) {
      console.log('Error:', error);
    }
    setLoading(false)
  }

if(loading)return 'Loading....'


  return (

    <div className='pt-24'>
      <p className='text-center'> {error}</p>
      <div className='flex justify-center items-center '>

        <div className="card w-96 bg-base-100 shadow-pink-600 shadow-xl border-[1px] border-pink-500">
          <div className="card-body">
            <h2 className="text-center text-xl">Log In</h2>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>

              </label>
              <input className="input input-bordered border-black w-full max-w-xs" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input className="input input-bordered border-black w-full max-w-xs" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-outline w-full hover:bg-pink-700" onClick={handleLogin}>Login</button>
            <small>Already have an account ?<Link className='text-pink-700 ml-4' to='/signUp'>Go to signUp</Link></small>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login;