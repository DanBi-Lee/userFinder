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

  render() {
    new SearchBox(this.target, this.type);
    new SearchResult(this.target, this.userlist);
  }
}

export default FavoriteUserSearchBox;
