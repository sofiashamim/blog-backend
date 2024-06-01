const express= require('express');
const app = express();
const port= 8000
const connectToDb =require('./db')
connectToDb()
const cors = require('cors')
let Auth= require('./models/Auth')
let authRoutes= require('./routes/authRoute')
let postRoute= require('./routes/postRoute')

app.use(cors())
app.use(express.json({limit:"50mb"}))

app.get('/',(req,res)=>{
    res.send('welcome')
})


app.use('/api/auth',authRoutes)
app.use('/posts',postRoute)

app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})