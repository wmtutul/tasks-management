import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from 'axios';


const Cards = ({ home, setInputDiv, data, setUpdateData }) => {

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }

    const handleCompleteTask = async (id) => {
        try {
            await axios.put(`http://localhost:8000/api/v1/update-complete-task/${id}`, {}, {headers} );
        } catch (error) {
            console.log(error);
        }                                                         
    }

    const handleImportant = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/update-imp-task/${id}`, {}, {headers} );
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }                                                         
    }

    const handleUpdate = async (id, title, desc) => {
        setInputDiv("fixed");     
        setUpdateData({ id: id, title: title, desc: desc });                                                   
    }

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/delete-task/${id}`, {headers} );
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }                                                         
    }

    return (
        <div className='grid grid-cols-3 gap-4 p-4'>
            {
                data && data.map((items, i) => (
                    <div className='flex flex-col justify-between bg-gray-800 rounded-sm p-4'>
                        <div>
                            <h3 className='text-xl font-semibold'>{items.title}</h3>
                            <p className='text-gray-300 my-2'>{items.desc}</p>
                        </div>
                        <div className="mt-4 w-full flex items-center">
                            <button
                                className={`${items.complete === false ? "bg-red-400" : "bg-green-700"} p-2 rounded w-3/6 cursor-pointer`}
                                onClick={() => handleCompleteTask(items._id)}
                            >
                                {items.complete === true ? "Completed" : "In Completed"}
                            </button>

                            <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around'>
                                <button className='cursor-pointer' onClick={()=>handleImportant(items._id)}>
                                    {items.important === false ? <CiHeart /> : <FaHeart className='text-red-500'/>}
                                </button>

                                { home !== "false" && <button 
                                    className='cursor-pointer' 
                                    onClick={()=>handleUpdate(items._id, items.title, items.desc)}
                                >
                                    <FaEdit /> 
                                </button> }

                                <button className='cursor-pointer' onClick={()=>deleteTask(items._id)}><MdDelete /></button>
                            </div>
                        </div>
                    </div>
                ))
            }
            {home === "true" && (
                <div className='flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 transition-all duration-300' >
                    <IoAddCircleSharp className='text-5xl cursor-pointer' onClick={() => setInputDiv("fixed")} />
                    <h2 className='text-2xl'>Add Task</h2>
                </div>
            )}
        </div>
    );

}

export default Cards;



