
const API_KEY = '22578935-bf31ef834e5011bcd0b44501d';
const BASE_URL = 'https://pixabay.com/api/';


export default class GalleryImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.shownCards = 0;
    this.totalCards = 0;
  }

 async getImages() {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&
    orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
    const images = await response.json();
   return images;
    // console.log(images);
     };
  // 

    incrementPage() {
      this.page += 1;
    }

    resetPage() {
      this.page = 1;
  }

  onTotalHits(value) {
    this.totalCards = value;
  }
  
   totalImages(value) {
    this.shownCards += value;
  }

   resetImages() {
    this.shownCards = 0;
  }

  ifTotalImages() {
    return (this.shownCards >= this.totalCards);
  }

    get query() {
      return this.searchQuery;
    }

    set query(newQuery) {
      this.searchQuery = newQuery;
    }

  }



