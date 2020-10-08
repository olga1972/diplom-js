export const photosLoaded = (photos) => {
  return {
      type: 'PHOTOS_LOADED',
      payload: photos
  }
}

export const auth = (isAuth) => {
  return {
      type: 'AUTH',
      payload: isAuth
  }
}

export const loading = (isLoading) => {
  return {
      type: 'LOADING',
      payload: isLoading
  }
}

export const setLikePhoto = (photo) => {
  return {
      type: 'SET_LIKE_PHOTO',
      payload: photo
  }
}

export const unsetLikePhoto = (id) => {
  return {
      type: 'UNSET_LIKE_PHOTO',
      payload: id
  }
}

