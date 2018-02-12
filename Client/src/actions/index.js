import axios from 'axios';
import { browserHistory } from 'react-router'; //browserHistory(informaction URL) komunica sa react-router
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';


const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
                    // axios uvek vraca obecanje kada dobije zahtev
    axios.post(`${ROOT_URL}/signin`, { email, password })
     .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                  dispatch({type: AUTH_USER});
                // - Save the JWT token, snima u local storage
                localStorage.setItem('token', response.data.token);
                //setItem - se koristi kada je potrebno da se snimi na local storage, token je ime podatka koji se snima

                // - redirect to the route '/feature'
               browserHistory.push('/feature'); //uspesno logovanje vodi na stranu feature
     })
     .catch(() => {
                 // If request is bad...
                // - Show an error to the user
                dispatch(authError('Bad Login info (Nisu ispravni podaci)' ));
      });
  }
}

export function signupUser({email, password}) {
return function(dispatch){
  axios.post(`${ROOT_URL}/signup`, {email, password})
    .then(response => {
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    })
    .catch(response => dispatch(authError(response.data.error)));
}
}

export function authError(error) {
  return{
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}


export function fatchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      });
    });
  }
}
