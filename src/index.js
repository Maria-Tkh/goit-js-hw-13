import './sass/main.scss';
import galleryList from './templates/gallery-list.hbs';
// import galleryItem from './templates/gallery-item.hbs';
import { Notify } from "notiflix";
const axios = require('axios').default;
import GalleryImages from './js/request.js';
import loadMoreBtn from './js/load-more-btn.js';

const refs = {
  galleryList: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
};

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.load-more',
//   hidden: true,
// });
// const GalleryImages = new GalleryImages();


refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.ref.button.addEventListener('click', getImages);

function onSearch(e) {
  e.preventDefault();
  
  GalleryImages.searchQuery = e.currentTarget.elements.searchQuery.value;
  
  if (GalleryImages.searchQuery === '') {
    Notify.info("Sorry, there are no images matching your search query. Please try again.");
  } else {
      return Notify.info(`Hooray! We found ${totalHits} images.`);
  }

  loadMoreBtn.show();
  GalleryImages.resetPage();
  clearGalleryImages();
  getImages();
}

function getImages() {
  loadMoreBtn.disable();
  GalleryImage.getImages().then(images => {
    appendImagesMarkup(images);
    loadMoreBtn.enable();
  });
}

function appendImagesMarkup(images) {
  refs.galleryList.insertAdjacentHTML('beforeend', galleryList(images));
}

function cleargalleryList() {
  refs.galleryList.innerHTML = '';
}





//   getImages()
//         .then(images => {
//             dataState = [...images];
//             refs.galleryList.innerHTML = template({ pageContent: dataState });
//         })
//         .catch(e => {
//             console.log("ошибка");
//         });
//   const totalHits = images.length;
//    Notify.info(`Hooray! We found ${totalHits} images.`);
  
// }

// window.onload = () => {
//     // const gallery = document.querySelector("gallery");
//     // const searchForm = document.querySelector("search-form");
//     getImages()
//         .then(images => {
//             dataState = [...images];
//             refs.galleryList.innerHTML = template({ pageContent: dataState });
//         })
//         .catch(e => {
//             console.log("ошибка");
//         });
//   const totalHits = images.length;
//    Notify.info(`Hooray! We found ${totalHits} images.`);
// }

  // window.addEventListener("scroll", () => {
  //   const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  //   if (scrollTop + clientHeight > scrollHeight - 10) {
  //     getImages(++page, limit).then(images => {
  //       console.log({ images });
  //       if (images.length === 0) {
  //          Notify.info("Sorry, there are no images matching your search query. Please try again.");
  //        }
  //       dataState = [...dataState, ...images];
  //       refs.galleryList.innerHTML = template({ pageContent: dataState });
  //     });
  //   }
  // });


