export default class LibraryService {
  constructor(http) {
    this.http = http;
  }

  async getLibraryItems(uid) {
    return await this.http.fetch(`/libraries/${uid}`, {
      method: 'GET',
    });
  }

  async postLibraryItem(uid, book) {
    return await this.http.fetch(`/libraries/${uid}`, {
      method: 'POST',
      body: JSON.stringify({
        ...book,
      }),
    });
  }

  async deleteLibraryItem(uid, bookId) {
    return await this.http.fetch(`/libraries/${uid}`, {
      method: 'DELETE',
      body: JSON.stringify({ bookId }),
    });
  }
}
