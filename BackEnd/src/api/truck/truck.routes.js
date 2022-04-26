const TruckRoutes = require('express').Router()

const { postNewTruck,getAllTruck,getTruck,pullTruck,deleteTruck} = require('./truck.controller')

TruckRoutes.get('/', getAllTruck)
TruckRoutes.post('/:id', getTruck)
// TransportRoutes.get('/filter/:type', getTransportFilter)
TruckRoutes.post('/', postNewTruck)
TruckRoutes.patch('/pull/:id', pullTruck)
TruckRoutes.delete('/delete/:id', deleteTruck)


module.exports = TruckRoutes