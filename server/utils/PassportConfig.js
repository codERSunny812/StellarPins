import { Strategy as LocalStrategy } from "passport-local"
import { UserModal } from "../models/user.modal.js"
import bcrypt from "bcryptjs"
import passport from "passport"

const initilizePassport = () => {
  console.log("initialize passport")
  // here done is a callback function
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          console.log("local Strategy is called")

          //  check the user in the data base
          const searchedUser = await UserModal.findOne({ email })

          if (!searchedUser)
            return done(null, false, { message: "incorrect email" })

          // if user found check for the password
          const validateUser = await bcrypt.compare(
            password,
            searchedUser.password
          )

          if (!validateUser)
            return done(null, false, { message: "incorrect password" })

          return done(null, searchedUser)
        } catch (error) {
          return done(error)
        } 
        
      }
    )
  )

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await UserModal.findById(id)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
}

export default initilizePassport
