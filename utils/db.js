import mongoose from "mongoose";
let isConnected;

/**
 * Connect to Database function
 *  -> Make sure to setup evironment variables
 *  -> Connects to a MongoDB Atlas instance
 *
 * @returns database connection
 */
const connectToDatabase = () => {
  if (isConnected) {
    return Promise.resolve();
  }

  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      isConnected = db.connections[0].readyState;
    });
};

export { connectToDatabase };
