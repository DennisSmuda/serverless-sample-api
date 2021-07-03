/**
 * Basic Middleware
 *
 * @param {fuction} fn function to call afterwards
 * @returns wrapped function
 */
const basicMiddleware = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return await fn(req, res);
};

export default basicMiddleware;
