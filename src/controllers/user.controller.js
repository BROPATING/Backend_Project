import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req, res) => {
    // res.status(200).json({
    //     "message": "ok"
    // })
    /* get user details form frontend
       Validation - not empty
       check if user already exists: username, email
       check for images, check for avatar
       uplaod them to cloudinary
       create user object - create entry in db
       remove password and refresh token field form response 
       check for user creation
       return res (response)
    */

    const {fullName, email, userName, password, avatar, coverImage} = req.body;

    /* Beginner level : 
    if (fullName === ""){
        throw new ApiError(400, "FullName is required")
    }
    */

    // Professional coders:
    if (
        [fullName, email, userName, password].some((field) => 
            field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User Already exist")
    }

    // handle the file 
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar already exist")
    }

    const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath);
    const uploadedCoverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!uploadedAvatar){
        throw new ApiError(400, "Avatar already exist")
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
        fullName,
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""  // since not declare as required 
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"  // "-" is minus i.e kya kya nahi chahiye
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).js(
        new ApiResponse(200, createdUser, "User registred successfully")
    )

})

export {registerUser};