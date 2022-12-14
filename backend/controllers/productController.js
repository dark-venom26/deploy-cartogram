const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require('cloudinary').v2;

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    if(Array.isArray(req.body?.images)){
        images = req.body?.images;
    }else{
        images.push(req.body.images)
    }

    let imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            upload_preset: "products",
            width: 350,
            crop: "scale",
        })

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.user = req.user.id;
    req.body.images = imagesLink;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

// Get all Product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 8;

    var apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    var products = await apiFeature.query;

    if (apiFeature.queryStr) {
        apiFeature = new ApiFeatures(Product.find(), req.query).search().filter()
        let totalProducts = await apiFeature.query;
        var productsCount = totalProducts.length;
    } else {
        productsCount = await Product.countDocuments();
    }

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage
    })
});


// Get all Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res) => {

    var products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    let images = [];

    if(req.body?.images){
        if(Array.isArray(req.body?.images)){
            images = req.body?.images;
        }else{
            images.push(req.body?.images)
        }
    }


    if (images.length !== 0) {
        // Delete all previous product images
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id);
        }

        let imagesLink = [];

        // Upload new product images
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                upload_preset: "products",
                width: 350,
                crop: "scale",
            })

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLink;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
});

// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
    }

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
});

// Create New Review Or Update The Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar.url,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;

    product.reviews.forEach(rev => {
        avg += rev.rating
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Product reviewed successfully"
    })
})


// Get All Reviews of a Product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating
    });

    if(reviews.length <= 0){
        var ratings = 0;
        var numOfReviews = 0;
    }else{
        ratings = avg / reviews.length;
        numOfReviews = reviews.length;
    }

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

    res.status(200).json({
        success: true,
        reviews: reviews
    })
});