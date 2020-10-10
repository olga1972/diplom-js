import React, { Component } from 'react';
import {unsplash, code} from '../../services';
import store from '../../store';
import {toJson} from 'unsplash-js';
import { auth } from '../../actions/index.js';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

class Auth extends Component {

  render() {
    
    console.log('props auth ' + this.props);
   const token = localStorage.getItem('token') || '';

  console.log(code, token);
  // Если код передан токен не был запрошен ранее, отправляем запрос на получение токена
  if (code) {

    if(token === '' || token ==='undefined') {

      unsplash.auth.userAuthentication(code)
          .then(toJson)
          .then(json => {
            unsplash.auth.setBearerToken(json.access_token);
             // Сохраняем полученный токен
            localStorage.setItem('token', json.access_token);
            store.dispatch(auth('true'));
            const message = "Вы успешно авторизовались!"

            return <ErrorMessage classError = {this.classError} message = {message}/>

          })
          .catch(err => {
            console.log('Auth err', err);
            store.dispatch(auth('false'));
            const message = "Ошибка авторизации!";
            return <ErrorMessage classError = {!this.classError} message = {message}/>
          })
    }
    else {
      store.dispatch(auth('true'));
      const message = "Вы успешно авторизовались!"
      return <ErrorMessage classError = {this.classError} message = {message}/>
    }

  }
  else {
    const message = "Ошибка!"
        return <ErrorMessage classError = {!this.classError} message = {message}/>
  }

  return <ErrorMessage classError = {this.classError} message = {this.message}/>
  }
}

export default Auth;
