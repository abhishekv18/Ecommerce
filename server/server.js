require("dotenv").config();


const express=require('express')
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRouter =require('./routes/auth-route');
const adminProductsRoute =require('./routes/admin/products-route');
const shopProductsRoute =require('./routes/shop/products-routes');
const shopCartRoute =require('./routes/shop/cart-route');
const shopAddressRoute =require('./routes/shop/address-route');
const commonFeatureRoute =require('./routes/common/feature-routes');
const shopOrderRoute =require('./routes/shop/order-routes');
const adminOrderRoute =require('./routes/admin/order-route');
const shopSearchRoute =require('./routes/shop/search-routes');
const shopReviewRoute =require('./routes/shop/review-route');
const adminReviewRoute =require('./routes/admin/adminReview-route');
// create a data bse connection

// create a sep file and then import


mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("Mongodb Connect"))
.catch(error=>console.log(error));




//1
const app=express();
//2
const PORT = process.env.PORT || 5000;


app.use(
    cors({
        origin:process.env.BASE_URL,
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials :true
    })
)

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/admin/products',adminProductsRoute);
app.use('/api/shop/products',shopProductsRoute);
app.use('/api/shop/cart',shopCartRoute);
app.use('/api/shop/address',shopAddressRoute);
app.use('/api/common/feature',commonFeatureRoute);
app.use('/api/shop/order',shopOrderRoute);
app.use('/api/admin/orders',adminOrderRoute);
app.use('/api/shop/search',shopSearchRoute);
app.use('/api/shop/review',shopReviewRoute);
app.use('/api/admin/adminReview',adminReviewRoute);
app.listen(PORT,()=> console.log(`server is running${PORT}`));

