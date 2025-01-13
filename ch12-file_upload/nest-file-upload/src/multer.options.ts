import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import { extname, join } from "path";

// multerOption object declaration
export const multerOption = {
    // Using diskStorage
    storage: diskStorage({
        // Setting file storage path
        destination: join(__dirname, '..', 'uploads'),
        // Setting filename
        filename: (req, file, cb) => {
            cb(null, randomUUID() + extname(file.originalname));
        }
    })
}