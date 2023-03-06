import express from 'express';
import { createComment, deleteComment, getAll, updateComment } from '../data/commentData.js';

const router = express.Router();

//TODO: bookid가 알맞은 형식인지 확인 필요 -> REGEX
router.get('/:id', async (req, res, next) => {
  const bookId = req.params.id;
  //   const data = bookId ? comments[bookId] : comments;
  const data = await getAll(bookId);

  if (data) {
    res.status(200).json(data[0]);
  } else {
    res.status(200).json([]);
  }
});

router.post('/:id', async (req, res, next) => {
  const bookId = req.params.id;
  const comment = req.body;

  if (comment) {
    const result = await createComment(bookId, comment);

    res.status(201).json(result[0]);
  } else {
    res.status(404).json({ message: 'Comment Not Found' });
  }
});

router.put('/:id', async (req, res, next) => {
  const bookId = req.params.id;
  const commentId = req.body.commentId;
  const text = req.body.text;

  if (commentId && text) {
    const result = await updateComment(text, bookId, commentId);
    res.status(200).json(result[0]);
  } else {
    res.status(404).json({ message: 'Comment Not Found' });
  }
});

router.delete('/:id', async (req, res, next) => {
  const bookId = req.params.id;
  const commentId = req.body.commentId;

  if (!commentId) {
    return res.status(404).json({ message: 'Comment Not Found' });
  }
  await deleteComment(bookId, commentId);
  return res.status(204).send();
});

export default router;
