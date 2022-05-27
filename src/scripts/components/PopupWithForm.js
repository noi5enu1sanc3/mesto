import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({popupSelector, elementsConfig, handleFormSubmit, shouldReset}) {
    super(popupSelector, elementsConfig);

    this._handleFormSubmit = handleFormSubmit;
    this._shouldReset = shouldReset;

    this._formSelector = elementsConfig.formSelector;
    this._inputSelector = elementsConfig.inputSelector;

    this._form = this._popup.querySelector(this._formSelector);
    this._inputs = this._form.querySelectorAll(this._inputSelector);
  }

  _getInputValues() {
    this._inputValues = {};
    
    this._inputs.forEach((input) => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }

  close() {
    super.close();
    if (this._shouldReset) {
      this._form.reset();
    }
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
