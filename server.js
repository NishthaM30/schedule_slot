const express = require('express');
const dotenv = require('dotenv');
const connection = require('./config/database');
const authRoute = require('./routes/authRoute');
const availRoute = require('./routes/availRoutes');
const getSlots = require('./routes/adminRoute');

dotenv.config();
connection()

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`Server is running on ${port}`);
})

app.use("/auth", authRoute);
app.use("/user", availRoute);
app.use("/admin",getSlots)