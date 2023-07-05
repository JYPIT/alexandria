import * as commentData from '../data/commentData.js';

export async function getComment(req, res) {
  const bookId = req.params.id;
  const data = await commentData.getAll(bookId);

  if (data) {
    res.status(200).json(data[0]);
  } else {
    res.status(200).json([]);
  }
}

export async function postComment(req, res) {
  const bookId = req.params.id;
  const comment = req.body;

  if (!comment) {
    return res.status(404).json({ message: 'Comment Not Found' });
  }

  const result = await commentData.createComment(bookId, comment);
  res.status(201).json(result[0]);
}

export async function putComment(req, res) {
  const bookId = req.params.id;
  const commentId = req.body.commentId;
  const text = req.body.text;

  if (commentId && text) {
    const result = await commentData.updateComment(text, bookId, commentId);
    res.status(200).json(result[0]);
  } else {
    res.status(404).json({ message: 'Comment Not Found' });
  }
}
export async function deleteComment(req, res) {
  const bookId = req.params.id;
  const commentId = req.body.commentId;

  if (!commentId) {
    return res.status(404).json({ message: 'Comment Not Found' });
  }
  commentData.removeComment(bookId, commentId);
  res.sendStatus(204);
}
