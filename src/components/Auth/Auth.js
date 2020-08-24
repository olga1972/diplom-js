import React, {Component} from 'react';

const {Provider, Consumer: AuthConsumer} = React.createContext({
  isAutorized: false
});

class AuthProvider extends Component {
  state = {isAutorized: false};

  autorize = () => {
    isAutorized: true
  }

  render() {
    const {isAutorized} = this.state;

    return (
      <Provider value={{isAutorized, autorize: this.autorize}}>
        {this.props.children}
      </Provider>
    )
  }
}

export function withAuth(WrappedComponent) {
  return class AuthHOC extends Component {
    render() {
      return (
        <AuthConsumer>
          {contextProps => {
            <WrappedComponent/>
    }}
        </AuthConsumer>
      )
    }
    
  }
}

export { AuthProvider };

import Unsplash, {toJson, setBearerToken} from 'unsplash-js';

const Auth = () => {
  console.log('auth');
    const unsplash = new Unsplash({
        accessKey: "rOCoQmwn-eMbE_b57Bgd9LlZmpYTmTlp8dyQ8i3tBds",
        secretKey: "vO_eYWwcjZtP10-Hk533hzyR9ZMsOESWTft6j1_i_Tc",
        callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
      });
      
      const authenticationUrl = unsplash.auth.getAuthenticationUrl([
        "public",
        "write_likes",
      ]);
      
      console.log(authenticationUrl);
      
      window.location.assign(authenticationUrl);
      
      // тут возможно нужна проверка на корректность открытого url
      
      const code = window.location.search.split("code=")[1];
      console.log('code' + code);
      console.log(window.location.search);
      
      if (code) {
        unsplash.auth.userAuthentication(code);
        unsplash.auth.setBearerToken(toJson.access_token);
        console.log(toJson.access_token);
        unsplash.auth.setBearerToken(toJson.access_token);
        console.log(toJson.access_token);
      
        unsplash.photos.listPhotos(2, 15, "latest")
        .then(res =>
            res.json())
        .then(json => {
          console.log('json' + json);})
        .catch(err => console.log('Auth err', err));
        
        //unsplash.photos.likePhoto("kBJEJqWNtNY");
      }
}


export default Auth;