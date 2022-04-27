const Truck = require('./truck.model')
const { setError } = require('../../utils/error/controller')

const postNewTruck = async (req, res, next) => {
    try {
        const newTruck = new Truck(req.body)

        const truckplateExist = await Truck.findOne({truckplate: newTruck.truckplate})
        if(truckplateExist) {
            return next(setError(404,'This Lorry already exists'))
        }

        const truckDB = await newTruck.save()
        return res.status(201).json(truckDB)

    } catch (error) {
        console.log('Error')
        return next(setError(500, 'Company not saved'))
    }
} 

const getAllTruck = async (req, res, next) => {
    try {
        const truckDB = await Truck.find()
        console.log(truckDB)
        res.status(200).json(truckDB)
    } catch (error) {
        return next(setError(500, 'Truck failed server'))
    }
}

const getTruck = async (req, res, next) => {
    try {
        const { id } = req.params
        //* Esto es si solamamente el mismo usuario puede ver su perfil
        // if(id != req.params.id) {
        //     return next(setError (403, 'Forbidden'))
        // }
        const truckDB = await Truck.findById(id)
        if (!truckDB) {
            return next(setError(404, 'Truck not found'))
        }
        return res.status(200).json(truckDB)

    } catch (error) {
        return next(setError(404, 'User server fail'))
    }
}

const pullTruck = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchTruck = new Truck(req.body)
        patchTruck._id = id
        
        
        const truckDB = await Truck.findByIdAndUpdate(id,{$set:{goodsinformation:patchTruck.goodsinformation}})
        if (!truckDB) {
           return next(setError(404, 'Truck not found'))
        }
        return res.status(200).json({ new: patchTruck, old: truckDB })
        
       
        
        
    } catch (error) {
        return next(setError(500, 'Goods Patch server error'))
    }
}

const deleteTruck= async (req, res, next) => {
    try {
        const { id } = req.params
        const truckDB = await Truck.findByIdAndDelete(id)
        if (!truckDB) {
            return next(setError(404, 'Truck not found'))
        }
        if (truckDB.img) deleteFile(truckDB.img)
        return res.status(200).json(truckDB)
    } catch (error) {
        return next(setError(500, 'Truck removed server error'))
    }
}

module.exports = {
    postNewTruck,
    getAllTruck,
    getTruck,
    pullTruck,
    deleteTruck
    
}