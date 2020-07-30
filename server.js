const express = require("express");
const app = express();
const connectDB = require("./config/db");

//app.get("/", (req, res) => res.send("Hello from Dinesh!"));
connectDB();

//init middleware
app.use(express.json());

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/tasks", require("./routes/api/tasks"));
app.use("/api/users", require("./routes/api/users"));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
