import express from 'express';

let comments = {
  309366184: [
    {
      id: 1677052706583,
      userId: 1,
      username: '홍길동',
      avatar: 'https://lh3.googleusercontent.com/a/AEdFTp71f_kRnQvKxnbvJIkpaXnqWJlwihABStdMIMh7Lw=s96-c',
      text: 'BYE',
      createdAt: 1677052706583,
    },
  ],
  309295168: [
    {
      id: 1677000000000,
      userId: 2,
      username: 'Potter',
      avatar:
        'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=399&q=80',
      text: '명작 !!!',
      createdAt: 1677000000000,
    },
    {
      id: 1677052700000,
      userId: 3,
      username: 'Merry',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      text: '사랑하는 책입니다!!!',
      createdAt: 1677052700000,
    },
  ],
};

const router = express.Router();

//TODO: bookid가 알맞은 형식인지 확인 필요 -> REGEX
router.get('/books/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  const data = bookId ? comments[bookId] : comments;
  res.status(200).json(data);
});

router.post('/books/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  const comment = req.body;

  if (comment) {
    comments[bookId] = [comment, ...comments[bookId]];
    res.status(201).json(comment);
  } else {
    res.status(404).json({ message: 'Comment Not Found' });
  }
});

router.put('/books/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  const commentId = req.body.commentId;
  const text = req.body.text;
  const comment = comments[bookId].find((comment) => comment.id === commentId);
  if (comment) {
    comment.text = text;
    res.status(200).json(comment);
  } else {
    res.status(404).json({ message: 'Comment Not Found' });
  }
});

router.delete('/books/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;
  const commentId = req.body.commentId;
  comments[bookId] = comments[bookId].filter((comment) => comment.id !== commentId);
  if (commentId) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Comment Not Found' });
  }
});

export default router;
