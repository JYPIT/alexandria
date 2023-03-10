import express from 'express';
import * as commentController from '../controller/commentController.js';

const router = express.Router();

//TODO: bookid가 알맞은 형식인지 확인 필요 -> REGEX
router.get('/:id', commentController.getComment);

router.post('/:id', commentController.postComment);

router.put('/:id', commentController.putComment);

router.delete('/:id', commentController.deleteComment);

export default router;
