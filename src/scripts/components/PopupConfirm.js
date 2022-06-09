import { elementsConfigPopup } from "../utils/constants";
import Popup from "./Popup.js";

class PopupConfirm extends Popup {
  constructor({popupSelector, elementsConfig, handleConfirm}) {
    super(popupSelector, elementsConfig);

    this._confirmButton = this._popup.queryselector(elementsConfig.)

    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {

  }
}
