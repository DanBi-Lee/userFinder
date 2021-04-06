import { favoriteList } from "../util/favorite";
import { getUsers } from "../util/search";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

class SearchBox {
  data = {
    FAVORITE: {
      userList: favoriteList(),
      scrollTop: 0,
    },
    GITHUB: {
      userList: [],
      scrollTop: 0,
    },
  };

  constructor(target, type) {
    this.target = target;
    this.type = type;
    this.init();
  }

  onSearch = (e) => {
    e.preventDefault();

    console.log(this.type);
    switch (this.type) {
      // 즐겨찾기 검색
      case "FAVORITE":
        console.log("즐찾");
        this.serachOnFavoriteList(e);
        break;
      // github 전체 사용자 검색
      case "GITHUB":
        console.log("전체");
        this.searchOnGithub(e);
        break;
      default:
        throw new Error("정의되지 않은 타입");
    }
    this.searchResult.setScroll(0);
  };

  searchOnGithub = async (e) => {
    const data = await getUsers(e.target.querySelector("#searchInput").value);
    this.data.GITHUB.userList = data.items;
    this.setSearchResult(data);
  };

  serachOnFavoriteList = (e) => {
    const keyword = e.target.querySelector("#searchInput").value;
    const userlist = favoriteList();
    const data = userlist.filter((user) => user.login.includes(keyword));
    this.searchResult.setData(data);
  };

  setType = (type) => {
    this.data[this.type].scrollTop = this.searchResult.searchResult.scrollTop;

    this.type = type;
    if (this.type === "FAVORITE") {
      this.data[type].userList = favoriteList();
    }

    this.searchResult.setType(this.type);
    this.searchResult.setData(this.data[type].userList);
    this.searchResult.setScroll(this.data[type].scrollTop);
  };

  setData = (data) => {
    this.data = data;
  };

  setSearchResult = (data) => {
    const userList = data.items;
    this.searchResult.setData(userList);
  };

  init = () => {
    this.searchBox = new SearchForm(this.target, this.type, this.onSearch);
    this.searchResult = new SearchResult(
      this.target,
      this.type,
      this.data[this.type].userList
    );
  };

  render = (type) => {};
}

export default SearchBox;
