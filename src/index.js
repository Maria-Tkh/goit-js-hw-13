import './sass/main.scss';
import galleryListTpl from './templates/gallery-list.hbs';
import { Notify } from "notiflix";
const axios = require('axios').default;
import GalleryImages from './js/request.js';
import LoadMoreBtn from './js/load-more-btn.js';

const refs = {
  galleryList: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
};
const loadButton = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const galleryImagesList = new GalleryImages();

refs.searchForm.addEventListener('submit', onSearch);
loadButton.ref.button.addEventListener('click', getImages);
// const totalHits = images.length;
function onSearch(e) {
  e.preventDefault();
  
  galleryImagesList.searchQuery = e.currentTarget.elements.searchQuery.value;
  
  if (galleryImagesList.searchQuery === '') {
    Notify.info("Sorry, there are no images matching your search query. Please try again.");
  }
   // else {
  //     return Notify.info(`Hooray! We found ${totalHits} images.`);
  // }

  loadButton.show();
  galleryImagesList.resetPage();
  cleargalleryImagesList();
  getImages();
}

function getImages() {
  loadButton.disable();
  galleryImagesList.getImages().then(images => {
console.log(images);


    appendImagesMarkup(images);
   
    loadButton.enable();
  });
}

function appendImagesMarkup(images) {
 refs.galleryList.insertAdjacentHTML('beforeend', galleryListTpl(images));
}

function cleargalleryImagesList() {
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


