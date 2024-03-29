export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let data;
    try {
      if (res.status !== 204) {
        data = await res.json();
      }
    } catch (error) {
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message = data.message ? data.message : 'Something Went Wrong :(';
      throw new Error(message);
    }

    return data;
  }
}
