const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
  },
  date : String,
  startTime: String,
  endTime: String,
  isBooked: {type: Boolean, default: true}
});

module.exports = mongoose.model("Booking", bookingSchema)