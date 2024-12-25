require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors");
const app = express()
const port = process.env.PORT || 4000;
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

//middleware
app.use(express.json());
app.use(cors({
    origin:['http://localhost:5174','http://localhost:5173'],
    credentials:true
}));

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Bool store server is running')
    })
}



main().then(()=>console.log("MongoDb connected successfully")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})