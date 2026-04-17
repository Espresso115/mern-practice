import ratelimit from "../config/upstash.js";


const rateLimiter=async (req,res,next) => {
    try{
        const {success}=await ratelimit.limit("limit-key");
        // limit-key will be different for different user (like user id)
        // so if one user is rate-limited, it does not affect other users
        // it can also be set to a particular IP
        if(!success){
            // 429: too many requests
            return res.status(429).json({
                message:"Too many requests, try again later."
            })
        }

        next();
    }catch(error){
        console.log("Rate limit error", error);
        // Do not block local note actions if the external rate-limit service is unavailable.
        next();
    }
};

export default rateLimiter;
