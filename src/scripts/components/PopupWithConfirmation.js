import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, elementsConfig, deleteCardHandler) {
    super(popupSelector, elementsConfig);
    this._deleteCardHandler = deleteCardHandler;
  }
  open(card) {
    this._card = card;
    console.log(this._card);
    super.open();
    this._popup.querySelector(this._elementsConfig.formSelector).addEventListener('submit', (evt) => {
      super.close();
      evt.preventDefault();
      this._deleteCardHandler(this._card);
    })
  }

  getCardId() {
    return this._card._id;
  }

  setEventListeners() {
    super.setEventListeners();
    
  }
}
