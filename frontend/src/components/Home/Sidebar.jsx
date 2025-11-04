import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant} from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = [
    {title: "All task", icon: <CgNotes />, link: "/" },
    {title: "Important task", icon: <MdLabelImportant />, link: "/importantTasks" },
    {title: "completed task", icon: <FaCheckDouble />, link: "/completedTasks" },
    {title: "incompleted task", icon: <TbNotebookOff />, link: "/incompletedTasks" },
  ];

  const [Data, setData] = useState();

  const logout = () => {
    localStorage.clear("id");
    localStorage.clear("token");
    dispatch (authActions.logout());
    navigate("/signup")
  }

  const headers = { 
    id: localStorage.getItem("id"), 
    authorization: `Bearer ${ localStorage.getItem("token") }`,
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/get-all-tasks", {headers});
      setData(response.data.data);
    };
    
    if( localStorage.getItem("id" ) && localStorage.getItem("token") ) {
      fetch();
    }
    
  });
  

  return (
    <>
        {Data && (
          <div>
            <h2 className='text-xl font-sea[bold]'>{Data.username}</h2>
            <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
            <hr />
          </div>
        )}
        <div>
          {data.map((items, i) => (
            <Link to={items.link} key={i} className='my-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600'>{items.icon} {items.title}</Link>
          ))}
        </div>
        <div>
          <button className='bg-gray-500 p-2 rounded w-full cursor-pointer hover:bg-gray-700' onClick={logout}>Log Out</button>
        </div>
    </>
  )
}

export default Sidebar




