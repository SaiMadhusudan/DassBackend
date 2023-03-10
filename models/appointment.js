const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' }
});


appointmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment