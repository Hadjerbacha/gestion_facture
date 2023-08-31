require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db3");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));


const uri = process.env.DATABASE_URL;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error.message);
  });
