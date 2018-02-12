import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true }; //prijava korisnika
    case UNAUTH_USER:
      return { ...state, authenticated: false }; // korisnik ne moze da se prijavi
    case AUTH_ERROR:
      return { ...state, error: action.payload }; // izbacuje gresku
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
  }
  return state;
}
