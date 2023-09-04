//loading environment variable
require("dotenv").config();
const connectToDb = require("./config/db.js");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//Connecting to the database
connectToDb();

//Declaring the configuration for the server
const app = express();
const port = process.env.PORT || 5500;

//Cofiguring middlewares
app.use(express.json({ extended: true }));

app.use(
  cors({
    // Cross origin conf
    credentials: true,
    //Default origin latter it will be changes
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
//Setting template engine
app.set("view engine", "ejs");
//Redering the index page
app.get("/", (req, res) => {
  res.render("index");
});

//Importing routes
const userRoutes = require("./routes/userRoutes.js");
const formRoutes = require("./routes/formRoutest.js");
const coustmerRoutes = require("./routes/coustmerRoutes.js");

//using routes
app.use("", userRoutes);
app.use("", formRoutes);
app.use("", coustmerRoutes);

//Starting the server

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
