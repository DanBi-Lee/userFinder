import favoriteOff from "../../images/favorite-off.svg";
import favoriteOn from "../../images/favorite-on.svg";
import { favoriteData, favoriteList } from "../util/favorite";
import { customCompare } from "../util/sortString";
import { getInitial, checkHangul } from "../util/stringHandling";
import loadingSpinner from "../../images/loading-spinner.png";
import { INITIAL_STATE } from "../util/loadingState";

class SearchResult {
  data = {
    searchResult: [],
    state: INITIAL_STATE(),
  };

  constructor(target, type, userList) {
    this.target = target;
    this.type = type;
    this.data.state.data = userList || [];
    this.searchResult = document.createElement("section");
    this.searchResult.classList = "search-result";
    this.target.append(this.searchResult);
    this.render(this.data.state.data);
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
      button.innerHTML = `
      <span class="hidden">
        즐겨찾기 추가
      </span>
      <img src="${favoriteOff}" title="즐겨찾기 추가" />
      `;
      button.querySelector("img").src = favoriteOff;
    } else {
      button.dataset.favorite = "true";
      button.innerHTML = `
      <span class="hidden">
        즐겨찾기 삭제
      </span>
      <img src="${favoriteOn}" title="즐겨찾기 삭제" />
      `;
    }
  };

  addFavorite = (button, data) => {
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

  setType = (type) => {
    this.type = type;
  };

  setState = (state) => {
    this.data = {
      ...this.data,
      state: { ...this.data.state, ...state },
    };

    this.render(this.data.state.data);
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
      this.getFirstLetter(this.data.state.data[index - 1].login)
    ) {
      header = this.getFirstLetter(user.login);
    }

    return header;
  };

  setScroll = (scrollTop) => {
    this.searchResult.scrollTop = scrollTop || 0;
  };

  render(data) {
    // 로딩중 화면
    if (this.data.state.loading) {
      return (this.searchResult.innerHTML = `
      <div class="message">
        <img class="loading-spinner" src=${loadingSpinner} width="60" height="60" />
        <p>검색중 입니다.</p>
      </div>`);
    }
    // 에러 발생 화면
    if (this.data.state.error) {
      return (this.searchResult.innerHTML = `<div class="message">
          <p>오류가 발생했습니다.</p>
          <p>${this.data.state.error}</p>
        </div>`);
    }

    // 결과가 0일 때 화면
    if (data.length === 0) {
      return (this.searchResult.innerHTML = `<div class="message">
        <p>결과가 없습니다.</p>
      </div>`);
    }

    // 정상 적으로 로드된 후 데이터 화면에 뿌리기
    const isFavoriteData = favoriteData();
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
               <img src="${favoriteOn}" title="즐겨찾기 삭제"  />
             </button>
              `
              : `
             <button class="favorite-button" data-favorite="false" data-data=${JSON.stringify(
               item
             )}>
              <span class="hidden">
                즐겨찾기 등록
              </span>
              <img src="${favoriteOff}" title="즐겨찾기 등록"  />
            </button>`
          }
        </article>`;
      })
      .join(""));
  }
}

export default SearchResult;
