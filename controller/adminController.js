const Availability = require('../models/availabilityModel');
const Booking = require('../models/bookingModel');

function generateSlot(start,end) {
  const [shr, smin] = start.split(":").map(Number);
  const [ehr, emin] = end.split(":").map(Number);
  const slots = [];
  let startTime = new Date(0,0,0,shr, smin)
  let endTime = new Date(0, 0, 0, ehr, emin)

  while(startTime.getTime() <= endTime.getTime){
    const nextSlot = new Date(startTime.getTime());
    slots.push({
      startTime,
      endTime
    })
    startTime = nextSlot
  }
  return slots;
}

exports.getAvailability = async(req, res) => {
  const {date} = req.params;
  const availabilities = await Availability.find({ date}).populate(
    "userId",
    "name email"
  );
  const bookings = await Booking.find({date})
  const result = [];
  for(let item of availabilities){
    const slots = generateSlot(item.startTime, item.endTime);
    const slotsByUser = bookings
    .filter((b) => b.userId.toString() === item.userId._id.toString())
    .map((b)=> b.startTime);

    const filteredSlots = slots.filter((slot) => {
      const s = slot.startTime;
      return (slotsByUser.includes(s))
    })

    result.push({
      userId: item.userId._id,
      name: item.userId.name,
      email: item.userId.email,
      slots: filteredSlots
    })    
  }
  res.json(result);
}

