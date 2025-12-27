import ratelimit from "../config/upstah.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limi-key");
    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
        status: "error",
      });
    }
    next();
  } catch (error) {
    console.log("Rate limiter error:", error);
    next(error);
  }
};

export default rateLimiter;
