export const GET_ADVERTS = 'GET_ADVERTS';

export function getAdverts(data) {
  const route = `/adverts?onpage=${data.onpage}&page=${data.page}&order=${data.order}`;
  return {
    type: GET_ADVERTS,
    http: httpClient => httpClient.get(route),
  }
}

export const GET_ADVERT_BY_ID = 'GET_ADVERT_BY_ID';

export function getAdvertById(id) {
  return {
    type: GET_ADVERT_BY_ID,
    http: httpClient => httpClient.get(`/adverts/${id}`),
  }
}

export const CREATE_ADVERT = 'CREATE_ADVERT';

export function createAdvert(data) {
  return {
    type: CREATE_ADVERT,
    http: httpClient => httpClient.post('/images', {
      headers: {
        'Content-Type': 'multipart/formdata',
      }
    }),
  }
}