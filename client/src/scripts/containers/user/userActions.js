export const SIGN_IN = 'SIGN_IN';

export function signIn(data) {
  return {
    type: SIGN_IN,
    http: httpClient => httpClient.post('/users/sign-in', data),
    redirect: ({ payload }) => {
      if (payload.success) {
        return '/';
      }
      return '/sign-in';
    },
  }
}

export const SIGN_UP = 'SIGN_UP';

export function signUp(data) {
  return {
    type: SIGN_UP,
    http: httpClient => httpClient.post('/users/sign-up', data),
    redirect: ({ payload }) => (payload.success ? '/' : '/sign-up'),
  }
}

export const SIGN_OUT = 'SIGN_OUT';

export function signOut() {
  return {
    type: SIGN_OUT,
    redirect: '/',
  }
}

export const CHECK_LOGIN = 'CHECK_LOGIN';

export function checkLogin() {
  return {
    type: CHECK_LOGIN,
    http: httpClient => httpClient.get('/users/check-login'),
  }
}
// export GET_USERS_ADVERTS = 'GET_USERS_ADVERTS';

// export function getUsersAdverts(id) {
//   return {
//     type: GET_USERS_ADVERTS,
//     http: httpClient => httpClient.get('/users/adverts'),
//     redirect: `/user/${id}/adverts`,
//   }
// }