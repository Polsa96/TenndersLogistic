const TransportcompanyRoutes = require('express').Router()

const { postNewTransportcompany,getAllTransportcompany,getTransportcompany} = require('./transportcompany.controller')

TransportcompanyRoutes.get('/', getAllTransportcompany)
TransportcompanyRoutes.get('/:id', getTransportcompany)
TransportcompanyRoutes.post('/', postNewTransportcompany)

module.exports = TransportcompanyRoutes