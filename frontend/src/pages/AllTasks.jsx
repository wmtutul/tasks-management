import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from '../components/Home/InputData';
import axios from 'axios';

const AllTasks = () => {

  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdateData, setUpdateData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/get-all-tasks", { headers });
      setData(response.data.data);
    };

    if( localStorage.getItem("id" ) && localStorage.getItem("token") ) {
      fetch();
    }
  });


  return (
    <>
      <div>
        <div className='w-full flex justify-end px-4 py-2'>
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircleSharp className='text-5xl text-gray-300 cursor-pointer hover:text-gray-50 transition-all duration-300' />
          </button>
        </div>

        {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdateData={setUpdateData} />}

      </div>

      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        UpdateData={UpdateData}
        setUpdateData={setUpdateData}
      />
    </>
  )
}

export default AllTasks;




