const express=require('express')
const app=express()
require("./db/conn");
const cors=require('cors')
const {User, Image}=require('./db/models/Schema')
const userRoute=require('./routers/userRoute')
const PORT=process.env.PORT||3000



app.use(express.json());
app.use(cors());
app.use("/user",userRoute);



app.listen(PORT, () => console.log('Server running on port ', PORT));

