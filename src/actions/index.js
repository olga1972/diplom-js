const photosLoaded = (newMenu) => {
  return {
      type: 'PHOTOS_LOADED',
      //payload: newList
  }
}

const photosRequested = () => {
  return {
      type: 'PHOTOS_REQUESTED',
  }
}

