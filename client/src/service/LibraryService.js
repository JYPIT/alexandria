export default class LibraryService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getLibraryItems(uid) {
    const response = await fetch(`${this.baseURL}/libraries/${uid}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async postLibraryItem(uid, book) {
    const response = await fetch(`${this.baseURL}/libraries/${uid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...book,
      }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  }

  async deleteLibraryItem(uid, bookId) {
    const response = await fetch(`${this.baseURL}/libraries/${uid}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }),
    });
    if (response.status !== 204) {
      console.log('BOOK NOT FOUND:(');
    }
  }
}
