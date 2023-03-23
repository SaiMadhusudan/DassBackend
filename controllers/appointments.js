const appointmentRouter = require('express').Router();
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');
const { request } = require('express');
const { response } = require('express');
require('dotenv').config()

appointmentRouter.get('/', async (request, response) => {
    const appointments = await Appointment.find({}).populate('doctor').populate('patient');
    response.json(appointments);
});

appointmentRouter.get('/:id', async (request, response) => {
    const appointment = await Appointment.findById(request.params.id).populate('doctor').populate('patient');
    response.json(appointment);
});

// get all appointments for a doctor
// get all appointments for a patient

appointmentRouter.post('/pending', async (request, response) => {
    const body = request.body;
    const appointment = new Appointment({
        doctor: body.doctor,
        patient: body.patient,
        status: 'pending',
        start : body.start,
        end : body.end
    });
    const savedAppointment = await appointment.save();
    response.json(savedAppointment);
});

appointmentRouter.post('/accepted', async (request, response) => {
    const body = request.body;

    const appointment = await Appointment.findById(body.id);
    appointment.status = 'accepted';
    const savedAppointment = await appointment.save();
    response.json(savedAppointment);
});

appointmentRouter.post('/rejected', async (request, response) => {
    const body = request.body;

    const appointment = await Appointment.findById(body.id);
    appointment.status = 'rejected';
    const savedAppointment = await appointment.save();  
    response.json(savedAppointment);
});

appointmentRouter.post('/completed', async (request, response) => {
    const body = request.body;

    const appointment = await Appointment.findById(body.id);
    appointment.status = 'completed';
    const savedAppointment = await appointment.save();
    response.json(savedAppointment);
});

module.exports = appointmentRouter;
