const initialState = {
    photos: [
        {"id": 1, "url": "https://via.placeholder.com/150", "preview":"https://via.placeholder.com/10", "author": "Ivan", "likes": "5", "date": "10/10/10"},
        {"id": 2, "url": "https://via.placeholder.com/150"}

    ],
    isAuth: false,
    //loading: true,
    //error: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PHOTOS_LOADED':
            return {
                ...state,
                photos: action.payload,
                //loading: false,
                //error: false
            };
        case 'PHOTOS_REQUESTED':
            return {
                ...state,
                photos: state.photos,
                //loading: true,
                //error: false
            };
        default:
            return state
    }
}



export default reducer;