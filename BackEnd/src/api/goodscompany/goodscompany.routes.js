const GoodscompanyRoutes = require('express').Router()

const { postNewGoodscompany,getAllGoodscompany,getGoodscompany} = require('./goodscompany.controller')

GoodscompanyRoutes.get('/', getAllGoodscompany)
GoodscompanyRoutes.get('/:id', getGoodscompany)
// GoodsRoutes.get('/filter/:type', getGoodsFilter)
GoodscompanyRoutes.post('/', postNewGoodscompany)

module.exports = GoodscompanyRoutes