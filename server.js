const express = require("express");
const app = express();
const connectDB = require("./config/db");

//app.get("/", (req, res) => res.send("Hello from Dinesh!"));
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
