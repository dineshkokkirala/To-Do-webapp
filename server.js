const express = require("express");
const app = express();
const connectDB = require("./config/db");

//app.get("/", (req, res) => res.send("Hello from Dinesh!"));
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
