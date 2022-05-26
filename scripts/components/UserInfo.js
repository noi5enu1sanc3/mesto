export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._username = document.querySelector(nameSelector);
    this._userinfo = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return { username: this._username.textContent, userinfo: this._userinfo.textContent };
  }

  setUserInfo(inputValuesGetter) {
    const data = inputValuesGetter;
    this._username.textContent = data.username;
    this._userinfo.textContent = data.userinfo;
  }
}
