import jwt from 'jsonwebtoken'
const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({
            success: false,
            message: 'Not Authorized Login Again'
        })
    }
    try {
        const token_decode = jwt.verify(token, "shipshop")
        req.body.userId = token_decode.id
        next()

    } catch (error) {
        console.error(error)
        res.json({
            success: false,
            message: 'Server Error in authUser middleware'
        })
    }
}

export default authUser

// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     // Check if authorization header is provided and starts with 'Bearer '
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({
//             success: false,
//             message: 'Not Authorized, Please Login Again'
//         });
//     }

//     // Extract the token from the header
//     const token = authHeader.split(' ')[1];

//     try {
//         // Verify the token
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//         // Attach the decoded user id to the request
//         req.body.userId = token_decode.id;

//         // Proceed to the next middleware
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: 'Server Error in authUser middleware'
//         });
//     }
// };

// export default authUser;
