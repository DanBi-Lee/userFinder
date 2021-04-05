import { favoriteList } from "../util/favorite";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";

class FavoriteUserSearchBox {
  constructor(target, type) {
    this.target = target;
    this.type = type;
    this.render();
  }

  userlist = favoriteList();

  serachOnFavoriteList = (e) => {
    e.preventDefault();
    const keyword = e.target.querySelector("#searchInput").value;
    const userlist = favoriteList();
    const data = userlist.filter((user) => user.login.includes(keyword));
    this.searchResult.setData(data);
  };

  render() {
    this.searchBox = new SearchBox(
      this.target,
      this.type,
      this.serachOnFavoriteList
    );
    this.searchResult = new SearchResult(this.target, this.type, this.userlist);
  }
}

export default FavoriteUserSearchBox;
