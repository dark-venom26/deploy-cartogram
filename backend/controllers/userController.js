const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require('cloudinary').v2;

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next)=>{
    const file = req.files?.avatar;
    const {name, email, password} = req.body;

    if(file){
        
        const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
            upload_preset: "avatars",
            width: 150,
            crop: "scale",
        })

        var user = await User.create({
            name, email, password, avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
        })
    }else{
        user = await User.create({
            name, email, password, avatar: {
                public_id: "",
                url: ""
            },
        })
    }
    
    sendToken(user, 201, res);
})

// Login User
exports.loginUser = catchAsyncErrors (async (req, res, next)=>{
    const {email, password} = req.body;

    // Checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please enter email & password", 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
})

// Logout User
exports.logout = catchAsyncErrors( async(req, res, next) => {
    
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    // Get Reset Password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nThis link is valid only for 15 minutes \n\nIf you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Cartogram Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));

    }

});

// Reset Password
exports.resetPassword = catchAsyncErrors(async(req, res, next) => {

    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({resetPasswordToken, resetPasswordExpire: {$gt: Date.now()}});

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired"), 400);
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 404))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
})

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update User Password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect", 400));
    }
    
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match", 400));
    }

    user.password = req.body.newPassword;

    await user.save()

    sendToken(user, 200, res)
})

// Update User Profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const file = req.files?.avatar;

    if(file){
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.uploader.destroy(imageId);

        
        const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
            upload_preset: "avatars",
            width: 150,
            crop: "scale",
        })

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }



    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        msg: "Profile updated successfully"
    })
})

// Get All Users (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find();

    res.status(200).json({
        success: true,
        users: user
    })
})

// Get All Today's new Users (admin)
exports.getAllTodaysUser = catchAsyncErrors(async (req, res, next) => {
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);

    const user = await User.find({createdAt: {$gte: start, $lt: end}});

    res.status(200).json({
        success: true,
        users: user
    })
})

// Get Single Users (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.paramx.id}`));
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update User Role -- ADMIN
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        msg: "Profile updated successfully"
    })
})


// Delete User -- ADMIN
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    
    const user = await User.findById(req.params.id);
    
    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))
    }

    const imageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success: true,
        msg: "successfully! Profile Deleted"
    })
})
