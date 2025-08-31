import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares this is global middleware applied to all routes
app.use(cors()); //cors is a middleware that handle cross origin requests
app.use(express.json()); //express.json is a middleware that parse the json body of the request
app.use(morgan("dev")); //morgan is a middleware that log the requests to the console 

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes); 
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE || 'development'} mode on port ${PORT}`.bgCyan
      .white
  );
  console.log(`Server URL: http://localhost:${PORT}`.bgGreen.white);
});
