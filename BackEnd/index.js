const express = require('express');
const cors = require('cors');
const {connect} = require('./src/db/connect');
const {setError} = require('./src/utils/error/controller')
// const cloudinary = require('cloudinary').v2;

const GoodsRoutes=require('./src/api/goods/goods.routes');
const GoodscompanyRoutes=require('./src/api/goodscompany/goodscompany.routes');
const TransportcompanyRoutes=require('./src/api/transportcompany/transportcompany.routes');
const TruckRoutes=require('./src/api/truck/truck.routes');
const UserRoutes=require('./src/api/user/user.routes');

const PORT = process.env.PORT || 8000;
const app = express();

connect();

//! CLOUDINARY
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY, 
//     api_secret:process.env.API_SECRET
// });

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

app.use(cors({
    origin:['http://localhost:3000','http://localhost:4200'],
    credentials:true,
}));

app.use(express.json({
    limit:'5mb'
}));

app.use(express.urlencoded({limit:'5mb',extended:true}));

app.use('/api/goods',GoodsRoutes);
app.use('/api/goodscompany',GoodscompanyRoutes);
app.use('/api/transportcompany',TransportcompanyRoutes);
app.use('/api/truck',TruckRoutes);
app.use('/api/user',UserRoutes);

app.use('*', (req, res, next) => {
    return next(setError(404, 'Route not found'))
})

app.use((error, req, res, next)=>{
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.disable('x-powered-by');

app.listen(PORT, () =>{
    console.log('Server is running in http://localhost:'+PORT);
});