const initialState = {
    photos: [],
    isAuth : false,
    isloading: false,
    message: '',
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
            isLoading: true,
          }

        case 'PHOTOS_LOADED':
            return {
                ...state,
                photos: action.payload,
                isLoading: false,
            }

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