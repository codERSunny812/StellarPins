import express from "express"
import { connectDB } from "./database/DBConnection.js"
import cookieParser from "cookie-parser"
import "dotenv/config"
import UserRouter from "./routes/User.js"
import PostRouter from "./routes/Post.js"
import initilizePassport from "./utils/PassportConfig.js"
import expressSession from "express-session"
import passport from "passport"
import flash from "connect-flash"
import { userModal } from "./models/user.modal.js"

const app = express()
const PORT = process.env.PORT || 3001

//view engine setup
app.set("view engine", "ejs")

//static file setup
app.use(express.static("./Public"))

//connecting the passport js to our application
initilizePassport();

//connecting with the DB
connectDB();


//middlewares
app.use(flash())
app.use(
  expressSession({
    secret: "this is a secret",
    resave: false,
    saveUninitialized: false,
  })
)
app.use(express.json({ limit: "50kb" }))
app.use(
  express.urlencoded({
    extended: true,
    limit: "50kb",
  })
)
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

// mount the  router
app.use("/api/v1/createuser", UserRouter)
app.use("/api/v1/createpost", PostRouter)

//home route that is the register route
app.get("/", (req, res) => {
  res.render("Register")
})

//login page
app.get("/login", (req, res) => {
  res.render("Login", { error: req.flash("error") })
})

// profile page
app.get("/profile", async (req, res) => {
    try {
        const user = await userModal.findOne({ _id: req.session.passport.user }).populate('posts');

        // Log the populated user object to see the posts array populated with post documents
        console.log(user);

        res.render("Profile", { user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send("Internal Server Error");
    }
});


// feed page
app.get("/feed", async(req, res) => {
  const user = await userModal.findOne({ _id: req.session.passport.user });

  console.log("the data of the loggged in user is");

  console.log(user)

  const allUser = await userModal.find({_id:{$ne:req.session.passport.user}})
  .populate("posts");
  

  console.log("the all user in the db are:")
  console.log(allUser);
  res.render("Feed" , {user,allUser})
})

// create post page
app.get("/createpost", async(req, res) => {
  const user = await userModal.findOne({ _id: req.session.passport.user })
  res.render("Create",{user});

})

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`)
})
