const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    Dates: [
        {
            Date: {
                type: Date
            },
            status: {
                type: String
            }
        }
    ]
})

module