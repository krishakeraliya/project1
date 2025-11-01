require("dotenv").config() // ⬅️ .env file load karo
const express = require("express")
const cors=require("cors")
const app = express()
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth-router") // ⬅️ Routes 
const questionRoute = require("./routes/question-router") // ⬅️ Question Routes 

const connectdb = require("./utils/db")
const errormiddleware = require("./middlewares/error-middleware")



const coreOptions={
  origin:"http://localhost:5173",
  methods:"GET , POST , PUT , DELETE, PATCH ,HEAD",
  credentials:true
}
app.use(cors(coreOptions))
app.use(bodyParser.json());
app.use("/api/auth", authRoute) 
app.use("/api", questionRoute)

// default
app.get('/', (req,res) => res.send('Career Portal API'));

app.use(errormiddleware)
const PORT = 5000;
connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
  })
})
