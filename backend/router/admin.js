import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/');
    },
    filename: function (req, file, cb) {
      //assets에 file이 존재하면 전부 삭제
      fse.emptyDir('assets', (err) => {
        if (err) {
          console.err;
        }
      });
      let newFileName = new Date().valueOf() + path.extname(file.originalname);
      cb(null, newFileName);
    },
  }),
});

router.get('/banners', (req, res, next) => {
  fs.readdir('assets/', (err, files) => {
    if (err) {
      throw err;
    }
    res.status(200).json(files);
  });
});

router.post('/upload/banner', upload.single('img'), (req, res, next) => {
  res.status(201).json({ msg: '배너가 변경되었습니다.' });
});

export default router;
