const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const router = require("./routes/Admin")
const Newsrouter = require("./routes/News");
const DashboardRouter = require("./routes/Dashboard");
const AboutRouter = require("./routes/About-us")
const BlogRouter= require("./routes/Blog")
const AuthRouter = require("./routes/Auth");
const EcommerceRouter = require("./routes/E-commerce")
const session = require("express-session");
const path = require("path");

dotenv.config()
const app = express();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
    })
);
// app.use('/uploads', express.static(path.join(__dirname, "./public", "/uploads"))); 

 // For accessing image in publicly
app.use("/public", express.static("public"));


app.use("/api", AuthRouter)
app.use("/admin", router)
app.use("/api", Newsrouter)
app.use("/v2", DashboardRouter)
app.use("/aboutus", AboutRouter)
app.use("/blog",BlogRouter)
app.use("/e-commerce",EcommerceRouter)

app.get("/", (req, res) => {
    res.sendStatus(200);
   });

// database connection created
mongoose.set('strictQuery', true);
mongoose 
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected successfully!")) 
    .catch(console.log);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//server created
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`app listen on port ${port}`)
})