export const GET_ADVERTS = 'GET_ADVERTS';

export function getAdverts(data) {
  const route = `/adverts?onpage=${data.onpage}&page=${data.page}&order=${data.order}`;
  return {
    type: GET_ADVERTS,
    http: httpClient => httpClient.get(route),
  }
}