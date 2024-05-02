import mongoose from "mongoose"

// function to connect the DB with you
export const connectDB = async () => {

  const url = process.env.URL
  try {
    await mongoose
      .connect(url)
      .then(() => {
        console.log("the data base is connected successfully")
      })
      .catch((error) => {
        console.log("the data base is not connected successfully")
      })
  } catch (error) {
    console.log(`mongodb is getting error ${error}`)
  }
}
