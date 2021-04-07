import { favoriteList } from "../util/favorite";
import { ERROR, START_LOAD, SUCCESS } from "../util/loadingState";
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

  // 검색시 타입에 따라 다른 검색 방식 작동
  onSearch = (e) => {
    e.preventDefault();

    switch (this.type) {
      // 즐겨찾기 검색
      case "FAVORITE":
        this.serachOnFavoriteList(e);
        break;
      // github 전체 사용자 검색
      case "GITHUB":
        if (e.target.querySelector("#searchInput").value === "") {
          // 검색어가 빈칸일 경우 검색되지 않음
          return;
        }
        this.searchOnGithub(e);
        break;
      default:
        throw new Error("정의되지 않은 타입");
    }

    this.searchResult.setScroll(0);
  };

  // Github에서 검색할 때 로직
  searchOnGithub = async (e) => {
    let data;
    try {
      this.searchResult.setState(START_LOAD());
      data = await getUsers(e.target.querySelector("#searchInput").value);
    } catch (e) {
      this.searchResult.setState(ERROR(e));
      return;
    }
    this.searchResult.setState(SUCCESS(data.items));
    this.data.GITHUB.userList = data.items;
    this.setSearchResult(this.data.GITHUB.userList);
  };

  // 로컬 저장소(즐겨찾기)에서  검색할 때 로직
  serachOnFavoriteList = (e) => {
    const keyword = e.target.querySelector("#searchInput").value.toLowerCase();
    const userlist = favoriteList();
    const data = userlist.filter((user) =>
      user.login.toLowerCase().includes(keyword)
    );
    this.searchResult.setState(SUCCESS(data));
  };

  // 타입이 변할 때 동작
  setType = (type) => {
    this.data[this.type].scrollTop = this.searchResult.searchResult.scrollTop;

    this.type = type;
    if (this.type === "FAVORITE") {
      this.data[type].userList = favoriteList();
    }

    this.searchResult.setType(this.type);
    this.searchResult.setState(SUCCESS(this.data[type].userList));
    this.searchResult.setScroll(this.data[type].scrollTop);
  };

  setData = (data) => {
    this.data = data;
  };

  setSearchResult = (data) => {
    this.searchResult.setState(SUCCESS(data));
  };

  init = () => {
    this.searchBox = new SearchForm(this.target, this.type, this.onSearch);
    this.searchResult = new SearchResult(
      this.target,
      this.type,
      this.data[this.type].userList
    );
  };
}

export default SearchBox;
