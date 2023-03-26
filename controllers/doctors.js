const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const doctorRouter = require('express').Router();
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const { request } = require('express');
const { response } = require('express');
require('dotenv').config()


doctorRouter.get('/', async (request, response) => {
    const doctors = await Doctor.find({}).populate('Patient');
    response.json(doctors);
})

doctorRouter.get('/:id', async (request, response) => {
    const doctor = await Doctor.findById(request.params.id).populate('Patient');
    response.json(doctor);
})

doctorRouter.post('/', async (request, response) => {
    const body = request.body;
    console.log(body);
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.PasswordHash, saltRounds);
    const regcode = body.RegCode;

    if (regcode !== process.env.REGCODE) {
        return response.status(401).json({
            error: 'Invalid Registration Code'
        })
    }

    const doctor = new Doctor({
        Name: body.Name,
        EmailId: body.EmailId,
        PasswordHash: passwordHash,
        BasicDetails: body.BasicDetails
    })
    const savedDoctor = await doctor.save();
    response.json(savedDoctor);
})

doctorRouter.post('/request', async (request, response) => {
    const body = request.body;
    const doctorId = body.DoctorId;
    const patientId = body.PatientId;
    const doctor = await Doctor.findById(doctorId);

    if (doctor.Requests.includes(patientId)) {
        return response.status(401).json({
            error: 'Request already sent'
        })
    }
    else {
        doctor.Requests = doctor.Requests.concat(patientId);
        await doctor.save();
        response.json(doctor);
    }
})

module.exports = doctorRouter;