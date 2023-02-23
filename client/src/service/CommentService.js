export default class CommentService {
  //   constructor(http) {
  //     this.http = http;
  //   }

  comments = {
    309366184: [
      {
        avatar: 'https://lh3.googleusercontent.com/a/AEdFTp71f_kRnQvKxnbvJIkpaXnqWJlwihABStdMIMh7Lw=s96-c',
        createdAt: 1677052706583,
        id: 1677052706583,
        text: 'BYE',
        username: 'Eclipse',
      },
    ],
    309295168: [
      {
        avatar:
          'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=399&q=80',
        createdAt: 1677000000000,
        id: 1677000000000,
        text: 'I love it!!!',
        username: 'Potter',
      },
      {
        avatar:
          'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=399&q=80',
        createdAt: 1677052700000,
        id: 1677052700000,
        text: 'Abracadabra',
        username: 'Harry',
      },
    ],
  };

  async getComments(bookId) {
    return this.comments[bookId];
  }

  async postComment(user, text, bookId) {
    const comment = {
      id: Date.now(),
      username: user.displayName,
      avatar: user.photoURL,
      text: text,
      createdAt: Date.now(),
    };
    this.comments[bookId] //
      ? this.comments[bookId].push(comment)
      : (this.comments[bookId] = [comment]);
    return comment;
  }

  async UpdateComment(bookId, commentId, text) {
    const findedIndex = this.comments[bookId].findIndex((comment) => comment.id === commentId);
    this.comments[bookId][findedIndex].text = text;
  }

  async deleteComment(bookId, commentId) {
    this.comments[bookId] = this.comments[bookId].filter((comment) => comment.id !== commentId);
  }
}
