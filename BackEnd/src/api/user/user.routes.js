const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const { postNewUser,getAllUser, getUser, loginUser, logoutUser,  pullUser} = require('./user.controller')

UserRoutes.get('/', getAllUser)
UserRoutes.get('/:id', getUser)
UserRoutes.post('/register', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAuth], logoutUser)
UserRoutes.patch('/pull/:id', pullUser)

module.exports = UserRoutes