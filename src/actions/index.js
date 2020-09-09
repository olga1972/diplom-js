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

