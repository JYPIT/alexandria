export default class SearchService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getSearchedList(keyword) {
    const response = await fetch(`${this.baseURL}/search?search_query=${keyword}`);
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }

    return data;
  }
}
