const express = require('express')
const { errorHandler } = require('./middlewares/errorMiddleware')
require('colors')
const { products } = require('./data/products')
const dotenv = require('dotenv')
const connectDb = require('./config/config')
const productRoutes = require('./routes/productsRoute')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoute')
//dotenv  config
dotenv.config();

//connecting to mongodb
connectDb()

const app = express()
//middleware bodyparser and we use express it has built in body parser feature
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>welcome brother</h1>')
})

app.use('/api', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
})

app.use(errorHandler)
const PORT = 8080
app.listen(process.env.PORT || PORT, () => {
    console.log(`server running at ${process.env.PORT} in ${process.env.NODE_ENV}`.inverse);
})