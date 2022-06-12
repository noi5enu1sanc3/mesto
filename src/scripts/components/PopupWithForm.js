import { elementsConfigPopup } from "../utils/constants.js";
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({popupSelector, elementsConfig, handleFormSubmit, shouldReset}) {
    super(popupSelector, elementsConfig);

    this._handleFormSubmit = handleFormSubmit;
    this._shouldReset = shouldReset;

    this._form = this._popup.querySelector(elementsConfig.formSelector);
    this._inputs = this._form.querySelectorAll(elementsConfig.inputSelector);
    this._submitButton = this._form.querySelector(elementsConfig.submitButtonSelector);
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

  renderButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
