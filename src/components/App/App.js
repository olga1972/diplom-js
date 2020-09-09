import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import { Route, Link, Switch } from 'react-router-dom';

import Header from '../../components/Header/Header';
import PhotosList from '../../components/PhotosList/PhotosList';
//import PhotoItem from '../../components/PhotoItem/PhotoItem';
import PhotoDetails from '../../components/PhotoDetails/PhotoDetails';

import { auth } from '../../actions/index.js'
import store from '../../store';
import Unsplash, {toJson} from 'unsplash-js';

// Создаем экземпляр объекта для доступа к API
const unsplash = new Unsplash({
  accessKey: "rOCoQmwn-eMbE_b57Bgd9LlZmpYTmTlp8dyQ8i3tBds",
  secret: "vO_eYWwcjZtP10-Hk533hzyR9ZMsOESWTft6j1_i_Tc",
  callbackUrl: "http://localhost:8080/auth"
});

// Генерируем адрес страницы аутентификации на unsplash.com
// и указываем требуемые разрешения (permissions)
const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes",
]);

  let start = 1;
  let end = 10;

function handleClick (){
  window.location.assign(authenticationUrl);
}

// Считываем GET-параметр code из URL
// www.example.com/auth?code=abcdef123456...
const code = window.location.search.split("code=")[1];


// Если код передан, отправляем запрос на получение токена
if (code) {
  unsplash.auth.userAuthentication(code)
  /* .then(res => {
    console.dir(res);
    res.json();
  }) */
  .then(toJson)
  .then(json => {
    
    // Сохраняем полученный токен
    unsplash.auth.setBearerToken(json.access_token);
 
    localStorage.setItem('token', json.access_token);
    console.dir(store.getState());
    store.dispatch(auth(store.getState().isAuth));
       
    // Теперь можно сделать что-то от имени пользователя
    // Например, поставить лайк фотографии
    //unsplash.photos.likePhoto("mtNweauBsMQ");
  })    
}

//получаем фото, грузим их.
const  listPhoto = (start, end, access_token) => {

  unsplash.auth.setBearerToken(access_token);

  return unsplash.photos.listPhotos(start, end, "latest")
    .then(toJson);
    //.then(res => res.json());
};

/* function loadOnePhoto(id) {
  if(store.getState().isAuth) {
    unsplash.photos.getPhoto(id)
    .then(toJson)
    .then(json => {
      console.log(json)
      return json})
}
} */

function loadPhotos() {
 if(store.getState().isAuth) {
      const data = listPhoto(+start, +end, localStorage.getItem('token'));
      
      data.then(d => {
        console.log(d); 
        store.dispatch({
          type: 'PHOTOS_LOADED',
          payload: d
    });
    console.log('store');
    console.dir(store.getState());
   })      
      data.then(d => {return (d)})
      //store.dispatch(photosLoaded(data));
      
 }
 else {
   alert('error');
 }

}

function morePhotos() {
  start = start + 10;
  end = end + 10;

  loadPhotos();
}

  class App extends Component {
    
  render() {
    console.log('isAuth');
    console.log(store.getState().isAuth);
    return (
      
        <div key="app" className="wrapper">
          
            <Header></ Header>
            <button onClick={handleClick}>Авторизация</button>
            <Link to='/photos'
                  onClick={loadPhotos}
            >
              Загрузить фото
              {/* <button onClick={loadPhotos}>Загрузить фото</button> */}
            </Link>
            {/* <PhotosList >{loadPhotos}</PhotosList> */}
    
            <button onClick={morePhotos}>Загрузить ещё</button>
    
      {/* <PhotoDetails loadOnePhoto={loadOnePhoto}></PhotoDetails>   */}
            <Switch>
              <Route key="Home" exact path='/' component={() => <h1>Welcome to Unsplash Photo-Viewer!</h1>}/>
                {/* {store.getState().isAuth ? <Route path='/photos' component={ PhotosList } /> : null } */}
              <Route key="PhotosList" exact path='/photos' component={ PhotosList } />
              <Route key="PhotoDetails" exact path='/photos/:id' component={ PhotoDetails }/>
              {/* <Redirect to={'/'}/> */}
              {/* <Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1>} /> */}
            </Switch>
        </div>
    )
  }
}

export default App;






