import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useSelector } from 'react-redux';

const Signup = () => {

    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if(isLoggedIn === true){
        navigate("/");
    }

    const [Data, setData] = useState({ username: "", email: "", password: "" });
    

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    }

    const submit = async () => {
        try {
            if (Data.username === "" || Data.email === "" || Data.password === "") {
                alert("All fields are required");
            } else {
                const response = await axios.post("http://localhost:8000/api/v1/sign-in", Data);
                setData({username: "", email:"", password:""});
                alert(response.data.message);
                navigate("/login");
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className=' h-[98vh] flex items-center justify-center'>
            <div className="p-4 w-2/6 rounded bg-gray-800">
                <div className='text-2xl font-semibold'>Signup</div>
                <input
                    type="username"
                    name='username'
                    placeholder='username'
                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                    onChange={change}
                    value={Data.username}
                />
                <input
                    type="email"
                    name='email'
                    placeholder='email'
                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                    required
                    onChange={change}
                    value={Data.email}
                />
                <input
                    type="password"
                    name='password'
                    placeholder='password'
                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                    required
                    onChange={change}
                    value={Data.password}
                />
                <div className='w-full flex items-center justify-between'>
                    <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded cursor-pointer' onClick={submit}>Sign Up</button>
                    <Link to="/login"> Already having an account? LogIn  here </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup

