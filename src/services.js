import Unsplash, {toJson} from 'unsplash-js';
//import {photosLoaded} from './actions/index.js';
import store from './store';
import { photosLoaded } from './actions';

// Создаем экземпляр объекта для доступа к API
  export const unsplash = new Unsplash({
    accessKey: "rOCoQmwn-eMbE_b57Bgd9LlZmpYTmTlp8dyQ8i3tBds",
    secret: "vO_eYWwcjZtP10-Hk533hzyR9ZMsOESWTft6j1_i_Tc",
    callbackUrl: "http://localhost:8080/auth"
  });

 //Генерируем адрес страницы аутентификации на unsplash.com
 // и указываем требуемые разрешения (permissions)
  export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "write_likes",
  ]);

  // Считываем GET-параметр code из URL
  // www.example.com/auth?code=abcdef123456...
    export const code = window.location.search.split("code=")[1];

    let start = 1;
    let end =10;

    export default class GetServices {

      constructor(unsplash, authenticationUrl) {
        this.unsplash = unsplash;
        this.authenticationUrl = authenticationUrl;
      }

      listPhoto (start, end) {
        return unsplash.photos.listPhotos(start, end, "latest")
          .then(toJson)
          .then(json => {
            console.log('json'); 
          return json;
        })
      };

      loadPhotos() {
        if(store.getState().isAuth) {
          const data = this.listPhoto(+start, +end, localStorage.getItem('token'));
          data.then(d => {
            store.dispatch(photosLoaded(d))
          })
        }
        else {
          alert('error');
        }
      }

   loadMore() {
     console.log('start', start, end);
     start = start + 10;
     end = end + 10;

     this.loadPhotos();
   }
}

