const Appointment = require('../models/Appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { formData: { name, contact, appointmentDate, userId, maild, category } } = req.body;
    const newAppointment = new Appointment({
      name,
      contact,
      mailId: maild,
      date: new Date(appointmentDate),
      category: category.category,
      createdBy: userId
    });
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    res.status(500).json({ message: `Failed to book appointment', ${error.message}` });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query parameters
    const appointments = await Appointment.find({ createdBy: userId }); // Use createdBy to filter
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve appointments', error });
  }
};

// Get all appointments for doctor
exports.getDoctorAppointments = async (req, res) => {
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
    const { status, user } = req.body;
    const { appointmentId } = req.params;

    // Check if the user is authorized (doctor or admin)
    if (user !== 'doctor' && user !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Update the appointment status
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment status updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update appointment status', error });
  }
};


exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    const { name, contact, mailId, date, category, status } = req.body;
    appointment.name = name || appointment.name;
    appointment.contact = contact || appointment.contact;
    appointment.mailId = mailId || appointment.mailId;
    appointment.date = date || appointment.date;
    appointment.status = status || appointment.status;
    appointment.category = category || appointment.category;
    await appointment.save();

    res.status(200).json({ message: 'Appointment updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update appointment', error });
  }
};
