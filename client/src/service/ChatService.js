export default class ChatService {
  constructor(http) {
    this.http = http;
  }
  async getSocket() {
    return await this.http.fetch(`/chat`, {
      method: 'GET',
    });
  }
}
