const mongoose = require('mongoose');

const connection = async()=> {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Database connected');
  } catch (error) {
    console.log('Connection to mongodb failed', error);
    process.exit()
  }
}

module.exports = connection;