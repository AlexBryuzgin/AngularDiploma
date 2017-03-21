export default class HttpClient {
  constructor() {
    this.baseURL = process.env.API_URL || 'http://localhost:8080';
  }


  resolveURL(customPath) {
    const path = customPath.toLowerCase();

    if (path === '') return this.baseURL;

    if (path.startsWith('http://')
      || path.startsWith('https://')
      || path.startsWith('//')) {
      return path;
    }

    const baseURLCut = this.baseURL.replace(/\/+$/, '');

    if (path.startsWith('/')) {
      return `${baseURLCut}${path}`;
    }

    return `${baseURLCut}/${path}`;
  }

  fetch(path, options = {}) {
    const url = this.resolveURL(path);
    return fetch(url, options);
  }

  request(path, method, options = {}) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.fetch(path, { headers, method, mode: 'cors', ...options });
  }

  get(path, options = {}) {
    return this.request(path, 'GET', options);
  }

  post(path, options = {}) {
    return this.request(path, 'POST', options);
  }

  delete(path, options = {}) {
    return this.request(path, 'DELETE', options);
  }

  put(path, options = {}) {
    return this.request(path, 'PUT', options);
  }
}
