const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

// Create New Order
exports.newOrder = catchAsyncErrors(async (req, res, next) =>{

    const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    order.orderItems.forEach(async (order)=>{
        await decreaseStock(order.product, order.quantity)
    });

    res.status(201).json({
        success: true,
        order
    })

})

async function decreaseStock(id, quantity){
    const product = await Product.findById(id);

    product.stock -= quantity;
    await product.save({validateBeforeSave: false})
}

// Get Single Order
exports.getSingleOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get Logged in User Orders
exports.myOrders = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.find({user: req.user._id});
    
    res.status(200).json({
        success: true,
        order
    })
})

// Get All Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// Get All Today's Orders -- Admin
exports.getAllTodaysOrders = catchAsyncErrors(async(req, res, next) => {
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);

    const orders = await Order.find({createdAt: {$gte: start, $lt: end}});

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// Update Orders Status -- Admin
exports.updateOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    order.orderStatus = req.body.status;
    
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })
})


// Delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true
    })
})

// Cancel Order
exports.cancelOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    order.orderItems.forEach(async (order)=>{
        await increaseStock(order.product, order.quantity)
    });

    await order.remove();

    res.status(200).json({
        success: true
    })
})

async function increaseStock(id, quantity){
    const product = await Product.findById(id);

    product.stock += quantity;
    await product.save({validateBeforeSave: false})
}