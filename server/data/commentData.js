import { db } from '../db/database.js';

export async function getAll(bookId) {
  return await db.execute(`SELECT * FROM comments WHERE bookId=${bookId} ORDER BY createdAt DESC`);
}

export async function getCommentById(bookId, commentId) {
  return await db.execute(`SELECT * FROM comments WHERE bookId=?  AND id=?`, [bookId, commentId]);
}

export async function createComment(bookId, comment) {
  const { userId, username, avatar, text } = comment;
  return db
    .execute(`INSERT INTO comments (bookId,userId,username,avatar,text,createdAt) VALUES (?,?,?,?,?,?)`, [bookId, userId, username, avatar, text, new Date()])
    .then((res) => getCommentById(bookId, res[0].insertId));
}

export async function updateComment(text, bookId, commentId) {
  return db.execute(`UPDATE comments SET text=? WHERE bookId=? AND id=?`, [text, bookId, commentId]).then(() => getCommentById(bookId, commentId));
}

export function removeComment(bookId, commentId) {
  db.execute('DELETE FROM comments WHERE bookId=? AND id=?', [bookId, commentId]);
}
