import React, { Component } from 'react';
import {unsplash, code} from '../../services';
import store from '../../store';
import {toJson} from 'unsplash-js';
import { auth } from '../../actions/index.js';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

//const Auth = () => {
class Auth extends Component {
  
  render() {
   const token = localStorage.getItem('token') || '';

  console.log(code, token);
  // Если код передан токен не был запрошен ранее, отправляем запрос на получение токена
  if (code) {

    if(token === '' || token ==='undefined') {
      console.log('if');
      
      unsplash.auth.userAuthentication(code)
          .then(toJson)
          .then(json => { 
          // Сохраняем полученный токен
          console.dir(json);
            unsplash.auth.setBearerToken(json.access_token);
            
            localStorage.setItem('token', json.access_token);
            store.dispatch(auth('true'));
            const message = "Вы успешно авторизовались!!!!!!"
            
            return <ErrorMessage message = {message}/>
           
          })
          .catch(err => {
            console.log('Auth err', err);
            store.dispatch(auth('false'));
            const message = "Ошибка авторизации!!!!!!!";
            return <ErrorMessage message = {message}/>
          })
    }
    else {
      console.log('else');
        store.dispatch(auth('true'));

        const message = "Вы успешно авторизовались!!!!!!"
        return <ErrorMessage message = {message}/>
    }

  }
  else {
    const message = "Ошибка!"
        return <ErrorMessage message = {message}/>

  }

  return <ErrorMessage message = {this.message}/>
  }

}

export default Auth;
