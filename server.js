const express=require('express')
const app=express()
//This app variable is useful to create To Configure our server...
const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/subscribers')

const db=mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',()=>console.log('connected to database'))

app.use(express.json())

const subscribersRouter=require('./routes/subscribers')
app.use('/subscribers',subscribersRouter)


app.listen(3000,()=>{
    console.log('server started')
})