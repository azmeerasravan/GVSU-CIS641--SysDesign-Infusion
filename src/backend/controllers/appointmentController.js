const Appointment = require('../models/Appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { name, contact, mailId, date, category } = req.body;
    const newAppointment = new Appointment({
      name,
      contact,
      mailId,
      date,
      category,
      createdBy: req.user.userId
    });
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book appointment', error });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve appointments', error });
  }
};

// Update appointment status (doctor/admin only)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    if (req.user.category !== 'doctor' && req.user.category !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });
    res.status(200).json({ message: 'Appointment status updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update appointment status', error });
  }
};


exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id, createdBy: req.user.userId });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    const { name, contact, mailId, date, category } = req.body;
    appointment.name = name || appointment.name;
    appointment.contact = contact || appointment.contact;
    appointment.mailId = mailId || appointment.mailId;
    appointment.date = date || appointment.date;
    appointment.category = category || appointment.category;
    await appointment.save();

    res.status(200).json({ message: 'Appointment updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update appointment', error });
  }
};
