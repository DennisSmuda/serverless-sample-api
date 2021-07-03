/**
 * Get Toke Helper Function
 *
 * required format:
 *    "authorization" : "Bearer __YOUR__TOKEN__"
 */

const getToken = (req) => {
  return req.headers.authorization.split(" ")[1];
};

export { getToken };
