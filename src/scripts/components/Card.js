export default class Card {
  constructor({data, handleCardClick}, templateSelector, elementsConfig) {
    this._link = data.link;
    this._name = data.name;

    this._handleCardClick = handleCardClick;

    this._templateSelector = templateSelector;

    this._cardElementSelector = elementsConfig.cardElementSelector;
    this._cardImageSelector = elementsConfig.cardImageSelector;
    this._cardCaptionSelector = elementsConfig.cardCaptionSelector;
    this._cardLikeButtonSelector = elementsConfig.cardLikeButtonSelector;
    this._cardDeleteButtonSelector = elementsConfig.cardDeleteButtonSelector;
    this._cardLikeButtonActiveClass = elementsConfig.cardLikeButtonActiveClass;

    this._handleLike = this._handleLike.bind(this);
    this._handleDeleteCard = this._handleDeleteCard.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this._element);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._cardElementSelector)
      .cloneNode(true);

    return cardElement;
  }

  renderCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardImageSelector);
    this._cardName = this._element.querySelector(this._cardCaptionSelector);
    this._cardLikeButton = this._element.querySelector(this._cardLikeButtonSelector);
    this._cardDeleteButton = this._element.querySelector(this._cardDeleteButtonSelector);

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _handleLike() {
    this._cardLikeButton.classList.toggle(this._cardLikeButtonActiveClass);
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', this._handleLike);
    this._cardDeleteButton.addEventListener('click', this._handleDeleteCard);
    this._cardImage.addEventListener('click', this._handleCardClick);
  }
}
