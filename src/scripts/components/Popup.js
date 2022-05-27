import { popupVisibleClass, popupCloseButtonSelector } from "../utils/constants.js"

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(popupCloseButtonSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(popupVisibleClass);
  }

  close() {
    this._popup.classList.remove(popupVisibleClass);
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

    this._popup.addEventListener('click', this._handleOverlayClose);
  }
}
