const Availability = require('../models/availabilityModel');
exports.addAvail = async(req, res) => {
  const { date, startTime, endTime } = req.body;
  const userId = req.user.id;

  if(!userId){
    console.log('User not found');
    return res.status(500)
  }
  try {
    if (!date || !startTime || !endTime) {
      return res.status(400).json({message: ' All fields are required'})
    }
    const today = new Date()
    today.setHours(0,0,0,0)

    const selectedDay = new Date(date)
    selectedDay.setHours(0,0,0,0)

    const maxDate = new Date()

    maxDate.setDate(today.getDate()+7);
    maxDate.setHours(23, 59, 59, 999);

    if(selectedDay < today || selectedDay > maxDate){
      return res.status(400).json({message: 'Date allowed for next 7 days only'})
    }

    const availability = new Availability({
      userId,
      date,
      startTime,
      endTime
    });
    await availability.save();
    return res.status(200).json({ message: 'availability added', availability })

  } catch (error) {
    console.error('Something went wrong while adding', error);
    return res.status(500).json({message: 'Internal Server Error'})
  }
}