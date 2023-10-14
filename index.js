const express = require("express");
require("dotenv").config();
const cookieSession = require("cookie-session");
const session = require("express-session");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./Routes/UserRoutes");
const postRoutes = require("./Routes/PostRoutes");
const passport = require("passport");
const authRoute = require("./Routes/authRoutes");
const ownerRoute = require("./Routes/OwnerRoutes");
const ownerPostRoute = require("./Routes/OwnerPostRoutes");
const adminRoute = require("./Routes/Admin/AdminRoutes");
const wishbookRoutes = require("./Routes/Wishbook/WishbookRoutes");
const ownerWishbookRoutes = require("./Routes/OwnerWishbook/OwnerWishbookRoutes");

const app = express();

app.use("/", express.static(path.join(__dirname, "build")));

app.use(
  cookieSession({
    name: "session",
    keys: ["demoProject"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "client")));

const allowedIPAddress = "http://18.232.92.158:5000/"; // Replace with your AWS EC2 instance's public IP address

const corsOptions = {
  origin: function (origin, callback) {
    if (origin === allowedIPAddress || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.get("/", (req, res) => {
  res.send("welcome");
});

// user section
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/auth", authRoute);
app.use("/wishbook", wishbookRoutes);

// user section

// owner section
app.use("/owner", ownerRoute);
app.use("/ownerpost", ownerPostRoute);
app.use("/ownerwishbook", ownerWishbookRoutes);
// owner section

// admin section
app.use("/admin", adminRoute);
// admin section

// to redirect frontend
app.use(express.static(path.join(__dirname, "/Web/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/Web/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("server is running!");
});
