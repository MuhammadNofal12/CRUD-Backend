import express from "express";
import mongoose from "mongoose"; // Change require to import
import Product from "./models/product.model.js";
// import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

//middleware
app.use(express.json());
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//allowing other data formats  to be sent to the server using postman ...
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoute);

//auth
//register
// app.post("/register", (req, res) => {
//   res.json("register");
// });

// //login
// app.post("/login", (req, res) => {
//   res.json("login");
// });

// //profile
// app.get("/profile", (req, res) => {
//   res.json("profile");
// });

//for user
app.use("/", userRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});

//get all products
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//get products by id
// app.get("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//create products
// app.post("/api/products", async (req, res) => {
//   // console.log(req.body);
//   // res.send(req.body);
//   try {
//     const product = await Product.create(req.body);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//update a product
// app.put("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     const updatedProduct = await Product.findById(id);
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//delete product
// app.delete("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndDelete(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

mongoose
  .connect(
    "mongodb+srv://muhammadnofal446:nofal@backenddb.2fc7g.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true, // Add these options to avoid deprecation warnings
    // }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Connection to MongoDB failed:", error.message); // Log error message for easier debugging
  });
