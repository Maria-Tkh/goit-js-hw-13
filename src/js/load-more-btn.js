export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.ref = this.Ref(selector);

    hidden && this.hide();
  }

  Ref(selector) {
    const ref = {};
    ref.button = document.querySelector(selector);
    // refs.label = refs.button.querySelector('.label');
    // refs.spinner = refs.button.querySelector('.spinner');

    return ref;
  }

  enable() {
    this.ref.button.disabled = false;
    // this.refs.label.textContent = 'Показать ещё';
    // this.refs.spinner.classList.add('is-hidden');
  }

  disable() {
    this.ref.button.disabled = true;
    // this.refs.label.textContent = 'Загружаем...';
    // this.refs.spinner.classList.remove('is-hidden');
  }

  show() {
    this.ref.button.classList.remove('is-hidden');
  }

  hide() {
    this.ref.button.classList.add('is-hidden');
  }
}