export default class RecommendService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getRelativeTitle(book) {
    const keyword = book.title.split(' ')[0];
    const response = await fetch(`${this.baseURL}/books/${book.itemId}/relatives?keyword=${keyword}`);

    const data = await response.json();

    return data;
  }

  async getRelativeAuthor(book) {
    const keyword = book.author.split(' ')[0];
    const response = await fetch(`${this.baseURL}/books/${book.itemId}/relatives?keyword=${keyword}`);

    const data = await response.json();

    return data;
  }
}
