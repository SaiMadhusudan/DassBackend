const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const patientSchema = new mongoose.Schema({
    Name: String,
    EmailId: String,
    Contact: String,
    PasswordHash: String,
    BasicDetails: String,
    Doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'

    }]
})

patientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.PasswordHash
    }
})

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient