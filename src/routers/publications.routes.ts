//EXPRESS
import { Router } from 'express'
//CONTROLLERS
import { Publicaciones } from './../controllers/publications/publications'
import { Publicar } from './../controllers/publications/publicar'
import { Likear } from './../controllers/publications/like'
import { Dislikear } from './../controllers/publications/dislike'
import { Delete_publication } from './../controllers/publications/delete_publication'
import { Comentar } from './../controllers/publications/comment'
//MULTER
import multer from '../middleware/multer'

//ROUTERS INITIALIZE
const routers = Router()
//ROUTERS GET
routers.get('/all_post', Publicaciones)
//ROUTERS POST
routers.post('/to_post', multer.array('image', 5), Publicar)
routers.post('/like', Likear)
routers.post('/dislike', Dislikear)
routers.post('/delete_post', Delete_publication)
routers.post('/comment', Comentar)

export default routers