import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsDir = 'uploads';
if(!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.round(Math.random()*1e9) + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if(['.jpg','.jpeg','.png','.pdf'].includes(ext)) cb(null, true);
  else cb(new Error('Only images/pdf allowed'));
};

export const upload = multer({ storage, fileFilter });
