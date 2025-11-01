const mongoose=require("mongoose")
const URI=process.env.MONGO_URI;
const connectdb=async()=>{
    try {
        await mongoose.connect(URI);
        console.log("connection sucessfully")
    } catch (error) {
        console.error("data base connection failed");
    process.exit(0) // Stop process on DB fail
    }
}
module.exports = connectdb;