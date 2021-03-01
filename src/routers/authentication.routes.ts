//EXPRESS
import { Router } from 'express'
//CONTROLLERS
import { SignIn } from './../controllers/authentication/signin'
import { SignUp } from './../controllers/authentication/signup'

const routers = Router()
routers.post('/signin', SignIn)
routers.post('/signup', SignUp)


export default routers