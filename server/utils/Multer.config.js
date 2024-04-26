import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Public/Image/uploads")
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4()
    cb(null, uniqueName + path.extname(file.originalname))
  },
})

export const upload = multer({ storage: storage })
