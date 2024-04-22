import bodyParser from 'body-parser';

import express from "express";
import sequelize from './api/config/sequelize.mjs';
import cors from "cors";
import registerRoute from "./api/routes/registerRoute.mjs"


// import loginroute from "./api/routes/testroute.js"
// import routes from "./api/routes/index.mjs"
const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))


var corOptions ={
    origin:'https://localhost:3000'
}
app.use(registerRoute)
app.use(cors(corOptions))
app.listen(3000,()=>{
    console.log("server started")
})

app.get("/",(req,res)=>{
    res.send("hello")
})



// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });