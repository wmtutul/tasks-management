import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {

  const [Data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  }

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:8000/api/v1/log-in", Data);
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };


  return (
    <div className=' h-[98vh] flex items-center justify-center'>
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className='text-2xl font-semibold'>Log In</div>
        <input
          type="username"
          name='username'
          placeholder='username'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
          required
          value={Data.username}
          onChange={change}
        />
        <input
          type="password"
          name='password'
          placeholder='password'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
          required
          value={Data.password}
          onChange={change}
        />
        <div className='w-full flex items-center justify-between'>
          <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded cursor-pointer' onClick={submit}>Lon In</button>
          <Link to="/signup"> Not having an account? SingUp here </Link>
        </div>
      </div>
    </div>
  )
}

export default Login




