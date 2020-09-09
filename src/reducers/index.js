const initialState = {
    photos: [
        {id: "mtNweauBsMQ", created_at: "2015-09-29T07:49:08-04:00", updated_at: "2020-08-28T01:05:17-04:00", promoted_at: "2015-09-29T07:49:08-04:00", width: 5683}
    ],
    isAuth : false,
    //loading: true,
    //error: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ('AUTH'):
            
        {
            console.log(state, action.payload);
            return {
                ...state,
                //isAuth: action.payload,
                isAuth: true
            }}
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