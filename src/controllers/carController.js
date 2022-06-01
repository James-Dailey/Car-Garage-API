//external dependancies
const boom = require('boom')

//get data models
const Car = require('../models/Car') 

//get the cars
exports.getCars = async (req, reply) => {
    try { 
        const cars = await Car.find()
        return cars
    } catch (err) {
        throw boom.boomify(err)
    }
}

//get single car by ID
exports.getrSingleCar = async (req, reply) => {
    try {
        const id = req.params.id
        const car = await Car.findById(id)
        return car
    }
    catch (err) {
        throw boom.boomify(err)
    }
}

//adding a new car
exports.addCar = async (req, reply) => {
    try{
        const car = new Car(req.body)
        return car.save()
    } catch (err) {
        throw boom.boomify(err)
    }
}

//update existing car
exports.updateCar = async (req, reply) => {
    try{
        const id = req.params.id
        const car = req.body
        const {... updateData} = car
        const update = await Car.findByIdAndUpdate(id, updateData, 
            {new: true})
            return update
    }       catch (err) {
        throw boom.boomify(err)
    }
}

//delete car
exports.deleteCar = async (req, reply) => {
    try {
        const id =req.params.id
        const car = await Car.findByIdAndRemove(id)
        return car
    } catch (err) {
        throw boom.boomify(err)
    }
}