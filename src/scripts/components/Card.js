import {
  cardElementSelector,
  cardImageSelector,
  cardCaptionSelector,
  cardLikeButtonSelector,
  cardDeleteButtonSelector,
  cardLikeButtonActiveClass
} from '../utils/constants.js';

export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(cardElementSelector)
      .cloneNode(true);

    return cardElement;
  }

  renderCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(cardImageSelector);
    this._cardName = this._element.querySelector(cardCaptionSelector);
    this._cardLikeButton = this._element.querySelector(cardLikeButtonSelector);
    this._cardDeleteButton = this._element.querySelector(cardDeleteButtonSelector);

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _handleLike() {
    this._cardLikeButton.classList.toggle(cardLikeButtonActiveClass);
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {this._handleLike()});
    this._cardDeleteButton.addEventListener('click', () => {this._handleDeleteCard()});
    this._cardImage.addEventListener('click', () => {this._handleCardClick(this._element)});
  }
}
