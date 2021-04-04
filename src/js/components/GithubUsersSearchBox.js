import { getUsers } from "../util/search";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";

class GithubUsersSearchBox {
  constructor(target, type) {
    this.target = target;
    this.type = type;
    this.render();
  }

  searchOnGithub = async (e) => {
    e.preventDefault();
    const data = await getUsers(e.target.querySelector("#searchInput").value);
    this.setSearchResult(data);
  };

  setSearchResult = (data) => {
    const userList = data.items;
    this.serachResult.setData(userList);
  };

  render() {
    this.searchBox = new SearchBox(this.target, this.type, this.searchOnGithub);
    this.serachResult = new SearchResult(this.target);
  }
}

export default GithubUsersSearchBox;
