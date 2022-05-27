import Popup from "./Popup.js";

import {
  formSelector,
  inputSelector
} from "../utils/constants.js"

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit, shouldReset}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._shouldReset = shouldReset;
    this._form = this._popup.querySelector(formSelector);
    this._inputs = this._form.querySelectorAll(inputSelector);
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
