import favoriteOff from "../../images/favorite-off.svg";
import favoriteOn from "../../images/favorite-on.svg";
import { favoriteData, favoriteList } from "../util/favorite";
import { customCompare } from "../util/sortString";
import { getInitial, checkHangul } from "../util/stringHandling";

class SearchResult {
  data = {
    searchResult: [],
  };

  constructor(target, type, userList) {
    this.target = target;
    this.type = type;
    this.data.searchResult = userList || [];
    this.searchResult = document.createElement("section");
    this.searchResult.classList = "search-result";
    this.target.append(this.searchResult);
    this.render(this.data.searchResult);
    this.init();
  }

  init = () => {
    this.FavoriteButtonEvent();
  };

  FavoriteButtonEvent = () => {
    this.searchResult.addEventListener("click", this.onFavorite);
  };

  onFavorite = (e) => {
    if (!e.target.closest(".favorite-button")) {
      return;
    }
    const button = e.target.closest(".favorite-button");
    const userData = JSON.parse(button.dataset.data);
    this.addFavorite(button, userData);
    this.setFavorite(button);
  };

  setFavorite = (button) => {
    if (button.dataset.favorite === "true") {
      button.dataset.favorite = "false";
      button.querySelector("img").src = favoriteOff;
    } else {
      button.dataset.favorite = "true";
      button.querySelector("img").src = favoriteOn;
    }
  };

  addFavorite = (button, data) => {
    console.log(data);
    const isFavorite = button.dataset.favorite;
    const list = favoriteList();
    const favoriteData = JSON.parse(localStorage.getItem("favoriteData")) || {};
    switch (isFavorite) {
      case "false":
        localStorage.setItem("favorite", JSON.stringify([...list, data]));
        localStorage.setItem(
          "favoriteData",
          JSON.stringify({ ...favoriteData, [data.id]: true })
        );
        break;
      case "true":
        const filterData = list.filter((user) => user.id !== data.id);
        localStorage.setItem("favorite", JSON.stringify(filterData));
        localStorage.setItem(
          "favoriteData",
          JSON.stringify({ ...favoriteData, [data.id]: false })
        );
        this.type === "FAVORITE" && button.closest(".item").remove();
        break;
      default:
        throw new Error("정의되지 않은 커맨드");
    }
  };

  setData = (data) => {
    this.data = {
      ...this.data,
      searchResult: data,
    };
    this.render(this.data.searchResult);
  };

  getFirstLetter = (username) => {
    let firstLetter;
    const code = username.toLowerCase().charCodeAt(0);
    if (checkHangul(code)) {
      firstLetter = getInitial(username);
    } else {
      firstLetter = username[0].toUpperCase();
    }

    const header = `<div class="letter-header">${firstLetter}</div>`;
    return header;
  };

  setFirstLetterHeader = (user, index) => {
    let header = "";
    if (index === 0) {
      header = this.getFirstLetter(user.login);
    } else if (
      this.getFirstLetter(user.login) !==
      this.getFirstLetter(this.data.searchResult[index - 1].login)
    ) {
      header = this.getFirstLetter(user.login);
    }

    return header;
  };

  setScrollReset = () => {
    this.searchResult.scrollTop = 0;
  };

  render(data) {
    const isFavoriteData = favoriteData();
    this.setScrollReset();
    return (this.searchResult.innerHTML = data
      .sort((a, b) => customCompare(a.login, b.login))
      .map((item, index) => {
        let header = this.setFirstLetterHeader(item, index);
        return `
        ${header}
        <article class="item">
          <img class="thumb" src="${item.avatar_url}" alt="thumbnail" />
          <p class="user-name">${item.login}</p>
          ${
            isFavoriteData[item.id]
              ? `
              <button class="favorite-button" data-favorite="true" data-data=${JSON.stringify(
                item
              )}>
               <span class="hidden">
                 즐겨찾기 삭제
               </span>
               <img src="${favoriteOn}" />
             </button>
              `
              : `
             <button class="favorite-button" data-favorite="false" data-data=${JSON.stringify(
               item
             )}>
              <span class="hidden">
                즐겨찾기 등록
              </span>
              <img src="${favoriteOff}" />
            </button>`
          }
        </article>`;
      })
      .join(""));
  }
}

export default SearchResult;
