import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import Header from '../../components/Header/Header';
import PhotosList from '../../components/PhotosList/PhotosList';
import store from '../../store';
import Unsplash, {toJson} from 'unsplash-js';


// Создаем экземпляр объекта для доступа к API
  const unsplash = new Unsplash({
    accessKey: "rOCoQmwn-eMbE_b57Bgd9LlZmpYTmTlp8dyQ8i3tBds",
    secretKey: "vO_eYWwcjZtP10-Hk533hzyR9ZMsOESWTft6j1_i_Tc",
    callbackUrl: "http://localhost:3000/auth",
  });

// Генерируем адрес страницы аутентификации на unsplash.com
// и указываем требуемые разрешения (permissions)
  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "write_likes",
  ]);


  function handleClick (){
    window.location.assign(authenticationUrl);
  }

// Считываем GET-параметр code из URL
// www.example.com/auth?code=abcdef123456...
  const code = window.location.search.split("code=")[1];
  console.log(code);

// Если код передан, отправляем запрос на получение токена
  if (code) {
    unsplash.auth.userAuthentication(code)
    .then(res => {
      console.dir(res);
      res.json();
    })
    .then(json => {
      // Сохраняем полученный токен
      console.log(json.access_token)
      localStorage.setItem('token', json.access_token)
      unsplash.auth.setBearerToken(json.access_token);
      
      // Теперь можно сделать что-то от имени пользователя
      // Например, поставить лайк фотографии
      unsplash.photos.likePhoto("mtNweauBsMQ");
      /* unsplash.photos.getPhoto("mtNweauBsMQ")
                  .then(toJson)
                  .then(json => {
                    console.log(json);
                  }); */
    })
    .catch(err => console.log('Auth err', err));
  }

  //получаем фото, грузим их.
  const  listPhoto = (start, end, access_token) => {

    unsplash.auth.setBearerToken(access_token);

    return unsplash.photos.listPhotos(start, end, "latest")
      .then(res => res.json());
  };
       
  function loadPhotos() {
    let start = 1;
    let end = 10;

    const data = listPhoto(+start, +end, localStorage.getItem('token'))
    data.then(d => console.log(d));
  }

  class App extends Component {
    

  render() {
    const isAuth =true;
    return (
      <div className="wrapper">
          <Header></ Header>
          <button onClick={handleClick}>Авторизация</button>
          <button onClick={loadPhotos}>Загрузить фото</button>
          <PhotosList />
      </div>
    )
  }
}

export default App;






