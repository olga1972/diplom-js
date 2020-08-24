export default class GotService {
    constructor() {
        this._apiBase = ' https://api.unsplash.com';
    }

    //response = requests.get(url)
//data = response.json()["urls"]["raw"]
//photos.listPhotos,
//photos.likePhoto, photos.unlikePhoto.

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    async getAllPhotos() {
        const res = await this.getResource(`/photos/`);
        return res;
        //return res.map(this._transformBook);
    }
    
    async getPhoto(id) {
        const photo = await this.getResource(`/photo/${id}/`);
        return photo;
        //return this._transformBook(book);
    }

}