import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, elementsConfig, deleteCardHandler) {
    super(popupSelector, elementsConfig);
    this._deleteCardHandler = deleteCardHandler;
    this._submitButton = this._popup.querySelector(elementsConfig.submitButtonSelector);
    this._submitHandler = this._submitHandler.bind(this);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._deleteCardHandler(this._card);
  }

  open(card) {
    this._card = card;
    this._popup.querySelector(this._elementsConfig.formSelector).addEventListener('submit', this._submitHandler);
    super.open();
  }

  close() {
    this._popup.querySelector(this._elementsConfig.formSelector).removeEventListener('submit', this._submitHandler);
    super.close();
  }

  getCardId() {
    return this._card._id;
  }

renderButtonText(text) {
  this._submitButton.textContent = text;
}
}
