import favoriteOff from "../../images/favorite-off.svg";

class SearchResult {
  data = {
    searchResult: [
      {
        login: "velopert",
        id: 17202261,
        node_id: "MDQ6VXNlcjE3MjAyMjYx",
        avatar_url: "https://avatars.githubusercontent.com/u/17202261?v=4",
        html_url: "https://github.com/velopert",
      },
      {
        login: "velopert2",
        id: 17202261,
        node_id: "MDQ6VXNlcjE3MjAyMjYx",
        avatar_url: "https://avatars.githubusercontent.com/u/17202261?v=4",
        html_url: "https://github.com/velopert",
      },
      {
        login: "velopert3",
        id: 17202261,
        node_id: "MDQ6VXNlcjE3MjAyMjYx",
        avatar_url: "https://avatars.githubusercontent.com/u/17202261?v=4",
        html_url: "https://github.com/velopert",
      },
    ],
  };

  constructor(target) {
    this.target = target;
    this.searchResult = document.createElement("section");
    this.searchResult.classList = "search-result";
    this.target.append(this.searchResult);
    this.render(this.data.searchResult);
  }

  render(data) {
    return (this.searchResult.innerHTML = data
      .map((item) => {
        return `
        <article class="item">
          <img class="thumb" src="${item.avatar_url}" alt="thumbnail" />
          <p class="user-name">${item.login}</p>
          <button class="favorite-button">
            <span class="hidden">
              즐겨찾기 등록
            </span>
            <img src="${favoriteOff}" />
          </button>
        </article>`;
      })
      .join(""));
  }
}

export default SearchResult;
