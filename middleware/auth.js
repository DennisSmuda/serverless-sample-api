/**
 * Auth Middleware
 * -> Checks for Bearer Token, sends error response if not found
 *
 * @param {fuction} fn function to call afterwards
 * @returns wrapped function
 */
const authMiddleware = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!isAuthenticated(req)) {
    res.status(401).send({ message: "Not Authenticated!" });
  }

  return await fn(req, res);
};

const isAuthenticated = (req) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Bearer ") === -1
  ) {
    return false;
  }
  return true;
};

export default authMiddleware;
