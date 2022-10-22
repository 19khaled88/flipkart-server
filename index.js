const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const path = require('path')
//routes
const userRoute = require('./src/routes/user')
const categoryRoute = require('./src/routes/category')
const productRoute = require('./src/routes/product')
const cartRoute = require('./src/routes/cart')

env.config()

mongoose
  .connect(
    `mongodb+srv://khaled:VNHAybzMnVDF6NMq@cluster0.ka5da.mongodb.net/mern-ecommerce?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    console.log('Database connected')
  })

// app.use(bodyparser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/public', express.static(path.join(__dirname ,'/src/uploads')))

//middleware
app.use('/api', userRoute)
app.use('/api', categoryRoute)
app.use('/api', productRoute)
app.use('/api', cartRoute)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})
