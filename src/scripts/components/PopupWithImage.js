import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector, elementsConfig) {
    super(popupSelector, elementsConfig);

    this._popupImageSelector = elementsConfig.popupImageSelector;
    this._popupImageCaptionSelector = elementsConfig.popupImageCaptionSelector;

    this._image = this._popup.querySelector(this._popupImageSelector);
    this._caption = this._popup.querySelector(this._popupImageCaptionSelector);
  }

  open(item) {
    this._caption.textContent = item.name;
    this._image.src = item.link;
    this._image.alt = item.name;

    super.open();
  }
}
