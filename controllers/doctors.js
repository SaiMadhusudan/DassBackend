const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const doctorRouter = require('express').Router();
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const { request } = require('express');
const { response } = require('express');

doctorRouter.get('/', async (request, response) => {
    const doctors = await Doctor.find({}).populate('Patient', { Name: 1, EmailId: 1, Contact: 1, BasicDetails: 1 });
    response.json(doctors);
})

doctorRouter.get('/:id', async (request, response) => {
    const doctor = await Doctor.findById(request.params.id).populate('Patient', { Name: 1, EmailId: 1, Contact: 1, BasicDetails: 1 });
    response.json(doctor);
})

doctorRouter.post('/', async (request, response) => {
    const body = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.PasswordHash, saltRounds);
    const contactHash = await bcrypt.hash(body.Contact, saltRounds);
    const emailHash = await bcrypt.hash(body.EmailId, saltRounds);

    const doctor = new Doctor({
        Name: body.Name,
        EmailId: emailHash,
        Contact: contactHash,
        PasswordHash: passwordHash,
        BasicDetails: body.BasicDetails
    })
    const savedDoctor = await doctor.save();
    response.json(savedDoctor);
})
