export default class Popup {
  constructor(popupSelector, elementsConfig) {
    
    this._elementsConfig = elementsConfig;

    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(this._elementsConfig.popupCloseButtonSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(this._elementsConfig.popupVisibleClass);
  }

  close() {
    this._popup.classList.remove(this._elementsConfig.popupVisibleClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close);

    this._popup.addEventListener('click', (evt) => {this._handleOverlayClose(evt)});
  }
}
