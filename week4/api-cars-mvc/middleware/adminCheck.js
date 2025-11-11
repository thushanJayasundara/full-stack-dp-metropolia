// adminCheck.js
function adminCheck(req, res, next) {
  const { role } = req.body || {};

  if (role === "admin") {
    return next(); // allow request to continue
  } else {
    return res.status(403).json({ message: "Access Denied" });
  }
}

module.exports = adminCheck;
