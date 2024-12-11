import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  // Check if the token exists in the cookies
  const token = req.cookies.jwt; // Extract token from the 'jwt' cookie
  const secret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).send("Access Denied"); // Unauthorized if no token is present
  }

  try {
    // Decode the token and attach the decoded user data to the request
    const decoded = jwt.verify(token, secret);
    req.user = decoded;  // Attach decoded token to `req.user`
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(401).send("Invalid Token"); // Invalid token error
  }
};

export default authMiddleware;
