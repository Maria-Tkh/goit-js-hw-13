
const API_KEY = '22578935-bf31ef834e5011bcd0b44501d';
const BASE_URL = 'https://pixabay.com/api/';

const options = {
  headers: {
        Authorization: API_KEY,
       "Content-Type": "application/json",
  },
};

export default class GalleryImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getImages() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&
    orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
  return fetch(url, options)
    .then(response => response.json())
    .then(({ images }) => {
      this.incrementPage();
      return images;
    });
}
incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

}



