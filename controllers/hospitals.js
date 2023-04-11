const hospitalRouter = require('express').Router()
const Hospital = require('../models/hospital')
const { request } = require('express')
const { response } = require('express')

hospitalRouter.get('/', async (request, response) => {
    const hospitals = await Hospital.find({})
    response.json(hospitals)
}
);

hospitalRouter.get('/:name', async (request, response) => {
    const hospital = await Hospital.find({ Name: request.params.name })
    response.json(hospital)
}
);

hospitalRouter.post('/', async (request, response) => {
    const body = request.body
    const hospital = new Hospital({
        Name: body.Name,
        Dates: body.Dates
    })
    const savedHospital = await hospital.save()
    response.json(savedHospital)
}
);

//get status of a date from parijath name
hospitalRouter.get('/:name/:date', async (request, response) => {
    const hospital = await Hospital.find({ Name: request.params.name })
    // if date not found it will return status Not Found
    console.log(request.params.date);
    console.log(hospital[0].Dates);
    const date = hospital[0].Dates.find(d => d.Date === request.params.date)
    if (date) {
        response.json(date)
    }
    else {
        response.json({ Status: 'Not Found' })
    }
}
);



//update a single date in the array
hospitalRouter.put('/date', async (request, response) => {
    const body = request.body
    const allhospital = await Hospital.find({ Name: body.Name });
    const hospital = allhospital[0]

    //if date does not exist I will update other wise I will add
    const date = hospital.Dates.find(d => d.Date === body.Date)
    if (date) {
        date.Slots = body.Slots
    } else {
        hospital.Dates = hospital.Dates.concat(body)
    }


    const savedHospital = await hospital.save()
    response.json(savedHospital)
}
);

module.exports = hospitalRouter


