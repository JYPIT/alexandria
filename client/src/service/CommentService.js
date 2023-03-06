export default class CommentService {
  constructor(http) {
    this.http = http;
  }

  async getComments(bookId) {
    return await this.http.fetch(`/books/${bookId}`, {
      method: 'GET',
    });
  }

  async postComment(bookId, user, text) {
    return await this.http.fetch(`/books/${bookId}`, {
      method: 'POST',
      body: JSON.stringify({
        userId: user.uid,
        username: user.displayName,
        avatar: user.photoURL,
        text: text,
      }),
    });
  }

  async updateComment(bookId, commentId, text) {
    return this.http.fetch(`/books/${bookId}`, {
      method: 'PUT',
      body: JSON.stringify({ commentId, text }),
    });
  }
  //FIXME: Unexpected end of JSON input at HttpClient.fetch 수정
  async deleteComment(bookId, commentId) {
    return this.http.fetch(`/books/${bookId}`, {
      method: 'DELETE',
      body: JSON.stringify({ commentId: commentId }),
    });
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
