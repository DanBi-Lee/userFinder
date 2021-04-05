import favoriteOff from "../../images/favorite-off.svg";
import favoriteOn from "../../images/favorite-on.svg";
import { favoriteData, favoriteList } from "../util/favorite";

class SearchResult {
  data = {
    searchResult: [],
  };

  constructor(target, userList) {
    this.target = target;
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
        break;
      default:
        throw new Error("정의되지 않은 커맨드");
    }
    console.log("list", list);
  };

  setData = (data) => {
    this.data = {
      ...this.data,
      searchResult: data,
    };
    this.render(this.data.searchResult);
  };

  render(data) {
    const isFavoriteData = favoriteData();
    return (this.searchResult.innerHTML = data
      .map((item) => {
        return `
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
