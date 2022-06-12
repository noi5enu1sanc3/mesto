import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, elementsConfig, deleteCardHandler) {
    super(popupSelector, elementsConfig);
    this._deleteCardHandler = deleteCardHandler;
    this._submitButton = this._popup.querySelector(elementsConfig.submitButtonSelector);
  }
  open(card) {
    this._card = card;
    super.open();
    this._popup.querySelector(this._elementsConfig.formSelector).addEventListener('submit', (evt) => {
      evt.preventDefault();
      super.close();
      this._deleteCardHandler(this._card);
    })
  }

  getCardId() {
    return this._card._id;
  }

renderButtonText(text) {
  this._submitButton.textContent = text;
}
}
