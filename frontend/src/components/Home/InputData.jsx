import axios from "axios";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const InputData = ({ InputDiv, setInputDiv, UpdateData, setUpdateData }) => {

    const [Data, setData] = useState({ title: "", desc: "" });

    useEffect(() => {
        setData({ title: UpdateData.title, desc: UpdateData.desc });

    }, [UpdateData]);


    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submitData = async () => {
        if (Data.title === "" || Data.desc === "") {
            alert("All fields are required");
        } else {
            await axios.post(" http://localhost:8000/api/v1/create-task", Data, { headers });
            setData({ title: "", desc: "" });
            setInputDiv("hidden");
        }
    }

    const UpdateTask = async () => {
        if (Data.title === "" || Data.desc === "") {
            alert("All fields are required");
        } else {
            await axios.put(`http://localhost:8000/api/v1/update-task/${UpdateData.id}`, Data, { headers });
            setUpdateData({ id: "", title: "", desc: "" });
            setData({ title: "", desc: "" });
            setInputDiv("hidden");
        }
    };

    return (
        <>
            <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>

            <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className="w-2/6 bg-gray-900 p-4 rounded">
                    <div className="flex justify-end">
                        <button
                            className="text-2xl cursor-pointer"
                            onClick={() => {
                                setInputDiv("hidden");
                                setData({ title: "", desc: "" });
                                setUpdateData({ id: "", title: "", desc: "" });
                            }
                            }
                        >
                            <RxCross2 />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder='Title'
                        name='title'
                        className='px-3 py-3 rounded border w-full bg-gray-700 my-3'
                        value={Data.title}
                        onChange={change}
                    />
                    <textarea
                        name="desc"
                        cols="30"
                        rows="10"
                        placeholder='Description'
                        className='px-3 py-3 rounded border w-full bg-gray-700 my-3'
                        value={Data.desc}
                        onChange={change}
                    ></textarea>

                    {UpdateData.id === "" ? <button
                        className='px-3 py-2 bg-blue-400 rounded text-black text-xl cursor-pointer font-semibold'
                        onClick={submitData}
                    >
                        Submit
                    </button> : <button
                        className='px-3 py-2 bg-blue-400 rounded text-black text-xl cursor-pointer font-semibold'
                        onClick={UpdateTask}
                    >
                        Update
                    </button>
                    }

                </div>
            </div>
        </>
    )
}

export default InputData
