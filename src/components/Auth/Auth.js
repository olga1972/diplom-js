import React from 'react';
import {unsplash, code} from '../../services';
import store from '../../store';
import {toJson} from 'unsplash-js';
import { auth } from '../../actions/index.js';

const Auth = () => {
  let token = localStorage.getItem('token');
  // Если код передан токен не был запрошен ранее, отправляем запрос на получение токена
    if (code && !token) {
      unsplash.auth.userAuthentication(code)
        .then(toJson)
        .then(json => { 
        // Сохраняем полученный токен
          unsplash.auth.setBearerToken(json.access_token);
          localStorage.setItem('token', json.access_token);
        })
        .catch(err => console.log('Auth err', err));
    }

    store.dispatch(auth(store.getState().isAuth));

    if(store.getState().isAuth ) {
      return (
        <>
        <h1>Вы успешно авторизовались!</h1>
        {/* <button onClick={loadPhotos}>Загрузить фото</button>  */}
          </>
      )
    }
    else {
      return  <h1>Ошибка авторизации!</h1>
    }
}

export default Auth;
