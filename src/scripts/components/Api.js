export default class Api {
  constructor({ token, id }, options) {
    this._token = token;
    this._id = id;
    this._baseUrl = options.baseUrl;
  }

  _getResponse = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  getUserInfo() {
    return fetch(`${this._baseUrl}${this._id}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => this._getResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}${this._id}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => this._getResponse(res));
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}${this._id}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then((res) => this._getResponse(res));
  }

  uploadNewCard(data) {
    return fetch(`${this._baseUrl}${this._id}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
    }),
    })
    .then(res => this._getResponse(res));
  }
}
