import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";

class FavoriteUserSearchBox {
  constructor(target, type) {
    this.target = target;
    this.type = type;
    this.render();
  }

  render() {
    new SearchBox(this.target, this.type);
    new SearchResult(this.target);
  }
}

export default FavoriteUserSearchBox;
