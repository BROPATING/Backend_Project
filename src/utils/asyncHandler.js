const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

import e from "express"

export {asyncHandler}

// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async() => {}

// const asyncHandler = (fun) => async (req, res, next) => {
//     try {
//         await async (fun(req, res, next))
        
//     } catch (err) {
//         res.status(err.code || 500).json({
//             sucess: false,
//             message: err.message()
//         })
//     }
// }