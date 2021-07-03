# Serverless Sample API

> Basic JWT Authentication + MongoDB on Vercel Serverless

You can use this repo as a starting-off-point, or as reference.

## 🌱 Requirements

For development, you will need Node.js and a node global package, npm, installed in your environement. Also you should head over to [vercel](https://vercel.com) and create an account.

## ⚙️ Installation

1. Clone the repo
   ```sh
   git clone https://github.com/dennissmuda/serverless-sample-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create **environment variables**, locally by creating a `.env` file - and [via web-ui](https://vercel.com/docs/environment-variables) on production.
   ```env
   MONGO_URI = 'YOURAPI'
   JWT_SECRET = 'YOURSECRET'
   ```
4. Start development
   ```sh
   npm vercel dev
   ```
   **please note:** you will to create and link your repo

## 🗂 Directory Structure

```
  .
  ├── api               # your API-Routes
  ├── middleware        # Middlewares (Basic + Auth)
  ├── models            # Mongoose Model declarations
  ├── utils             # DB + Auth utilities
  └── vercel.json       # important CORS settings
```

## Usage

If you have a client app you can send request like to any other API. Checkout some example code using [axios](https://github.com/axios/axios):

```js
import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : "https://_YOUR_API_.vercel.app/api",
});

// Register
const { user, token } = await API.post("/auth/register", {
  username,
  email,
  password,
});

// Login
const { user, token } = await API.post("/auth/login", {
  email,
  password,
});

// Regular get request (needs to be authenticated!)
const { users } = await API.get("/users");
```

You can use tools like [insomnia](https://insomnia.rest/) to develop your API locally.
