import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards';

const IncompletedTasks = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/get-incomplete-tasks", { headers });
      setData(response.data.data);
    };
    fetch();
  });

  return (
    <div>
      <Cards home={"false"} data={Data}/>
    </div>
  )
}

export default IncompletedTasks

