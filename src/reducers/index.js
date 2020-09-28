const initialState = {
    photos: [
        {id: "mtNweauBsMQ", created_at: "2015-09-29T07:49:08-04:00", updated_at: "2020-08-28T01:05:17-04:00", promoted_at: "2015-09-29T07:49:08-04:00", width: 5683}
    ],
    isAuth : false,
    isloading: false,
    //error: false,
    message: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ('AUTH'):
            return {
                ...state,
                isAuth: action.payload,
                isLoading: false,
            }
        case ('LOADING'):
          return {
            ...state,
            isLoading: true
          }

          /* case ('ERROR'):
            return {
              ...state,
              error: true
            } */

            /* case ('MESSAGE_ERROR'):
              console.log('MESSAGE_ERROR');
              console.log(action.payload)
            return {
              ...state,
              message: action.payload
            } */

        case 'PHOTOS_LOADED':
            return {
                ...state,
                photos: action.payload,
                isLoading: false,
                //error: false
            }

        case 'PHOTOS_REQUESTED':
            return {
                ...state,
                photos: state.photos,
                //loading: true,
                //error: false
            };

        case 'SET_LIKE_PHOTO':
            action.payload.likes++;
            
            return {
                ...state,
                photos: state.photos.map(photo => {
                  if(photo.id === action.payload.id) {
                    return {
                      ...photo,
                      likes: action.payload.likes,
                    }
                  }
                  return photo;
                })
              };

        case 'UNSET_LIKE_PHOTO':
            action.payload.likes--;

            return {
                ...state,
                photos: state.photos.map(photo => {
                  if(photo.id === action.payload.id) {
                    return {
                      ...photo,
                      likes: action.payload.likes,
                    }
                  }
                  return photo;
                })
              };

        default:
            return state
    }
}



export default reducer;