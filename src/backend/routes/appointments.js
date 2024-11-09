const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  updateAppointment
} = require('../controllers/appointmentController');
const auth = require('../middleware/auth');  

router.post('/book', auth, createAppointment);
router.get('/getAppointments', auth, getAppointments);
router.put('/status', auth, updateAppointmentStatus);
router.put('/:id', auth, updateAppointment);

module.exports = router;
