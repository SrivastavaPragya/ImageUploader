const express=require('express')
const app=express()
require("./db/conn");
const cors=require('cors')
const {User, Image}=require('./db/models/Schema')
const userRoute=require('./routers/userRoute')
const PORT=process.env.PORT||3000



const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));



app.use(cors());


app.use("/user",userRoute);



app.listen(PORT, () => console.log('Server running on port ', PORT));

