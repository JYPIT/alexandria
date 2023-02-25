export default class CommentService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getComments(bookId) {
    const response = await fetch(`${this.baseURL}/books/${bookId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async postComment(bookId, user, text) {
    const response = await fetch(`${this.baseURL}/books/${bookId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Date.now(), userId: user.uid, username: user.displayName, avatar: user.photoURL, text: text, createdAt: Date.now() }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  }

  async updateComment(bookId, commentId, text) {
    const response = await fetch(`${this.baseURL}/books/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId, text }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async deleteComment(bookId, commentId) {
    const response = await fetch(`${this.baseURL}/books/${bookId}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ commentId }),
    });
    if (response.status !== 204) {
      console.log('NOT EXIST');
    }
  }

  //Server 구성 전

  //   async getComments(bookId) {
  //     if (!this.comments[bookId] || this.comments[bookId] === []) return [];
  //     return this.comments[bookId];
  //   }

  //   async postComment(user, text, bookId) {
  //     const comment = {
  //       id: Date.now(),
  //       username: user.displayName,
  //       avatar: user.photoURL,
  //       text: text,
  //       createdAt: Date.now(),
  //     };
  //     this.comments[bookId] //
  //       ? this.comments[bookId].push(comment)
  //       : (this.comments[bookId] = [comment]);
  //     return comment;
  //   }

  //   async UpdateComment(bookId, commentId, text) {
  //     const findedIndex = this.comments[bookId].findIndex((comment) => comment.id === commentId);
  //     this.comments[bookId][findedIndex].text = text;
  //   }

  //   async deleteComment(bookId, commentId) {
  //     this.comments[bookId] = this.comments[bookId].filter((comment) => comment.id !== commentId);
  //   }
}
