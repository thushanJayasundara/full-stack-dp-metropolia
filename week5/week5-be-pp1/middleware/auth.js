// middleware/auth.js

// This middleware checks if the user is an admin
function auth(req, res, next) {
  // Check if admin query parameter is "true"
  const isAdmin = req.query.admin === "true";

  if (isAdmin) {
    // Admin access granted - let them through to the next handler
    next();
  } else {
    // Not admin - send 403 Forbidden
    res.status(403).json({
      message: "Access denied. You need admin privileges.",
    });
  }
}

module.exports = auth;
