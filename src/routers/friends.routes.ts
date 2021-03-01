//EXPRESS
import { Router } from 'express'
//CONTROLLERS
import { Sugerencias } from './../controllers/friends/sugerencias'
import { add_friend, remove_friend } from './../controllers/friends/addAndDelete'

const routers = Router()
routers.get('/sugerencias', Sugerencias)
routers.post('/add_friend', add_friend)
routers.post('/remove_friend', remove_friend)

export default routers