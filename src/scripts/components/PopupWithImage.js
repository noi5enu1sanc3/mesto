import Popup from "./Popup.js";
import { popupImageCaption, popupImage } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = popupImage;
    this._caption = popupImageCaption;
  }

  open(item) {
    this._caption.textContent = item.name;
    this._image.src = item.link;
    this._image.alt = item.name;

    super.open();
  }
}
