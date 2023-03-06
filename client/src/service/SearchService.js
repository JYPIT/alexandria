export default class SearchService {
  constructor(http) {
    this.http = http;
  }

  async getSearchedList(keyword) {
    return await this.http.fetch(`/search?search_query=${keyword}`);
  }
}
