import searchIcon from "../../images/search.svg";

class SearchBox {
  constructor(target, type) {
    this.target = target;
    this.type = type;
    this.form = document.createElement("form");
    this.form.classList = "search-box";
    this.target.appendChild(this.form);

    this.render();
  }

  render = () => {
    return (this.form.innerHTML = `
      <fieldset>
        <legend>검색창 ${this.type}</legend>
        <label class="hidden" for="serachInput">검색할 사용자명을 입력하세요.</label>
        <input type="text" placeholder="검색할 사용자명을 입력하세요." value="" class="search-input" id="searchInput" name="searchInput" />
        <button class="search-button">
          <img src=${searchIcon} alt="검색" />
        </button>
      </fieldset>
    `);
  };
}

export default SearchBox;
