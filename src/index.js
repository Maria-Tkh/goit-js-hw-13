import './sass/main.scss';
import galleryListTpl from './templates/gallery-list.hbs';
import { Notify } from "notiflix";
const axios = require('axios').default;
import GalleryImages from './js/request.js';
// import LoadMoreBtn from './js/load-more-btn.js';

const refs = {
  galleryList: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
};
// const loadButton = new LoadMoreBtn({
//   selector: '.load-more',
//   hidden: false,
// });
const galleryImagesList = new GalleryImages();



// const totalHits = images.length;
function onSearch(e) {
  e.preventDefault();
  refs.loadMoreBtn.classList.add('is-hidden');

  galleryImagesList.resetPage();
  galleryImagesList.resetImages();
  galleryImagesList.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  cleargalleryImagesList();
  if (galleryImagesList.searchQuery === '') {
    //  cleargalleryImagesList();
     return;
      }
  getImages();
}

function getImages() {

  galleryImagesList.getImages().then(images => {
    // console.log(images);
    // console.log(images.hits.length);
    appendImagesMarkup(images.hits);
    
    const totalHits = images.totalHits;
      if (images.hits.length === 0) {
     Notify.info("Sorry, there are no images matching your search query. Please try again.");
     return;
      }
    
    // if (galleryImagesList.searchQuery === '') {
    //  cleargalleryImagesList();
    //  return;
    //   }
    
    if (images.hits.length > 0) {
      Notify.info(`Hooray! We found ${totalHits} images.`);
      refs.loadMoreBtn.classList.remove('is-hidden');
      // return;
    }
    
    galleryImagesList.incrementPage();
    galleryImagesList.totalImages(images.hits.length);
    galleryImagesList.onTotalHits(images.totalHits);
    cleargalleryImagesList();
     if (images.hits.length < 40) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      refs.loadMoreBtn.classList.add('is-hidden');
      return;
     }
    appendImagesMarkup(images.hits);
  })
  .catch (error => console.log(error));
}
const onLoadMore = () => {
  galleryImagesList.getImages()
    .then(images => {
      galleryImagesList.incrementPage();
      galleryImagesList.totalImages(images.hits.length);
      appendImagesMarkup(images.hits);
      if (images.hits.length < 40) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      refs.loadMoreBtn.classList.add('is-hidden');
      return;
     }
    })
    .catch (error => console.log(error));
}

function appendImagesMarkup(images) {
 refs.galleryList.insertAdjacentHTML('beforeend', galleryListTpl(images));
}

function cleargalleryImagesList() {
  refs.galleryList.innerHTML = '';
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);




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


