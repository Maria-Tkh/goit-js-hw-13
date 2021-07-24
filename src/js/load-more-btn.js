export default class LoadMoreBtn {
  constructor({ selector, hidden = true }) {
    this.ref = this.Ref(selector);

    hidden && this.hide();
  }

  Ref(selector) {
    const ref = {};
    ref.button = document.querySelector(selector);
    
    return ref;
  }

  // enable() {
  //   this.ref.button.disabled = false;
  // }

  // disable() {
  //   this.ref.button.disabled = true;
   
  // }

  show() {
    this.ref.button.classList.remove('is-hidden');
  }

  hide() {
    this.ref.button.classList.add('is-hidden');
  }
}