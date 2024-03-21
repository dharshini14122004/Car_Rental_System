const mongoose = require('mongoose')

const carRentalSchema = new mongoose.Schema({
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    name : {
        type: String
    },
    email : {
        type: String
    },
    phone : {
        type: Number
    },
    car : {
        type: String
    }
    // car: {
    // id: {
    //     type: Number
    // },
    // make: {
    //     type: String
    // },
    // model: {
    //     type: String
    // },
    // price : {
    //     type: Number
    // },
    // year : {
    //     type: Number
    // }
    // }
})


const CarDetails = mongoose.model('carDetails',carRentalSchema)

//to export modules and variables
module.exports = { CarDetails }