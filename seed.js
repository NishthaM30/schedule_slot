const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel')
const bcrypt = require('bcrypt')

dotenv.config();
mongoose.connect(process.env.MONGO_URL);

async function seed(){

  const password = await bcrypt.hash('abc123', 10)
  const users = [
    { name: 'Admin', email: 'admin@gmail.com', password, role: 'admin'},
    { name: 'User1', email: 'user1@gmail.com', password, role: 'user' },
    { name: 'abc', email: 'abc@gmail.com', password, role: 'user' },
    { name: 'lmn', email: 'lmn@gmail.com', password, role: 'user' },
  ] 
  await User.insertMany(users);
  console.log('Data inserted');
  mongoose.disconnect()
}

seed()