//EXPRESS
import { Router } from 'express'
//CONTROLLERS
import { Usr } from './../controllers/user'
import { Profile } from './../controllers/user/profile'

const routers = Router()
routers.get('/user', Usr)
routers.get('/profile', Profile)

export default routers