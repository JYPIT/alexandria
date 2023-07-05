import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class AdminService {
  constructor(http) {
    this.http = http;
  }

  async getBanners() {
    return await this.http.fetch('/admin/banners', {
      method: 'GET',
    });
  }

  async writeBannerImg(bannerImg) {
    const formData = new FormData();
    formData.append('img', bannerImg);
    return await axios({
      url: `${BASE_URL}/admin/upload/banner`,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
