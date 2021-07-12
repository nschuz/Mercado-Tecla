const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50,
    message: "Too many request from your IP, Please  try again latter"
});

module.exports = {
    apiLimiter
};