import multer from 'multer'
import { extname } from 'path'
import fs from 'fs-extra'
multer({ dest: 'upload/temp' })

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { type } = req.body
    const { _id }: any = req.user
    const path = `upload/${_id}/${type}/`
    await fs.ensureDir(path)
    cb(null, path)
  },
  filename: (req, file, cb) => {
    const ext = extname(file.originalname)
    cb(null, `${file.fieldname}-${Date.now()}${ext}`)
  }
})
 
export default multer({ storage: storage })