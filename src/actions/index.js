export const photosLoaded = (photos) => {
  return {
      type: 'PHOTOS_LOADED',
      payload: photos
  }
}

export const photosRequested = () => {
  return {
      type: 'PHOTOS_REQUESTED',
  }
}

export const auth = (isAuth) => {
  return {
      type: 'AUTH',
      payload: isAuth
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

