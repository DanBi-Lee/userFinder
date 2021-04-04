import FavoriteUserSearchBox from "./components/FavoriteUsersSearchBox";
import GithubUsersSearchBox from "./components/GithubUsersSearchBox";
import Header from "./components/Header";
import TabBox from "./components/TabBox";

class App {
  data = {
    type: "GITHUB",
  };

  constructor(target) {
    this.target = target;
    this.render();
    console.log(this.data.type);
  }

  setData = (data) => {
    this.data = data;
    this.render();
  };

  setSearchType = (type) => {
    const data = { ...this.data, type };
    this.setData(data);
  };

  render = () => {
    this.target.innerHTML = ``;

    new Header(this.target);
    new TabBox(this.target, this.handlingTabMenu, this.data.type);

    switch (this.data.type) {
      // 즐겨찾기 검색
      case "FAVORITE":
        new FavoriteUserSearchBox(this.target, this.data.type);
        break;
      // github 전체 사용자 검색
      case "GITHUB":
        new GithubUsersSearchBox(this.target, this.data.type);
        break;
      default:
        throw new Error("정의되지 않은 타입");
    }
  };

  handlingTabMenu = (e) => {
    if (e.target.nodeName !== "BUTTON") {
      return;
    }
    const target = e.target;
    const type = target.dataset.type;
    this.setSearchType(type);
  };
}

export default App;
