export default class HttpClient {
  constructor(options) {
    this.baseURL = process.env.API_URL || options.baseURL;
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

  request(path, method, bodyOptions = {}, options = {}) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers.append('authorization', localStorage.getItem('ACCESS_TOKEN'));
    // eslint-disable-next-line
    method !== 'GET' ? options.body = JSON.stringify(bodyOptions) : null;
    return this.fetch(path, {
      headers,
      method,
      mode: 'cors',
      ...options,
    });
  }

  get(path, options = {}) {
    return this.request(path, 'GET', null, options);
  }

  post(path, body, options = {}) {
    return this.request(path, 'POST', body, options);
  }

  delete(path, body, options = {}) {
    return this.request(path, 'DELETE', body, options);
  }

  put(path, body, options = {}) {
    return this.request(path, 'PUT', body, options);
  }
}
