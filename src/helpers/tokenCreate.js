const jwt = require('jsonwebtoken');

function createToken(userId, userRole, userEmail) {
    const payload = { userId };
    const secret = process.env.SECRET_KEY; // Replace with your own secret key
    const options = { expiresIn: '1h' }; // Token expires in 1 hour

    return jwt.sign(payload, secret, options);
}
module.exports = createToken;