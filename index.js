const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

//import connectDb method
const connectDb = require('./db/connect')

app.use(express.static('./view'))

//body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//ejs settings
app.set('view engine','ejs')
app.set('views','./view')

//default route
app.use(`/`,require('./route/userRoute'))

//server listen
app.listen(PORT,()=>{
    connectDb()
    console.log(`server started and live @ http://localhost:${PORT}`)
})

