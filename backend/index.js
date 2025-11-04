const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const UserAPI = require("./src/routes/user");
const TaskAPI = require("./src/routes/task");

//"type": "module",
// Backend Coding Rules to me:  Model ⇒ controller  ⇒ route ⇒ index.js(server)

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use("/api/v1", UserAPI);
// localhost:8000/api/v1/sign-in
app.use("/api/v1", TaskAPI);
// localhost:8000/api/v1/sign-in

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL 


mongoose.connect(URL).then(()=>{
    console.log("Database Connected Successfully");

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: http://localhost:${PORT}`)
    })
}).catch(error => console.log(error));











