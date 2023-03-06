export default class RecommendService {
  constructor(http) {
    this.http = http;
  }

  async getRelativeTitle(book) {
    const keyword = book.title.split(' ')[0];
    return await this.http.fetch(`/books/${book.itemId}/relatives?keyword=${keyword}`);
  }

  async getRelativeAuthor(book) {
    const keyword = book.author.split(' ')[0];
    return await this.http.fetch(`/books/${book.itemId}/relatives?keyword=${keyword}`);
  }
}
