import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import TabBox from "./components/TabBox";

class App {
  data = {
    type: "GITHUB",
  };

  constructor(target) {
    this.target = target;
    this.init();
  }

  setData = (data) => {
    this.data = data;
  };

  // 타입이 전환되면 tabBox와 searchBox에 타입 전달
  setSearchType = (type) => {
    const data = { ...this.data, type };
    this.setData(data);
    this.tabBox.setType(this.data.type);
    this.searchBox.setType(this.data.type);
  };

  init = () => {
    this.header = new Header(this.target);
    this.tabBox = new TabBox(this.target, this.handlingTabMenu, this.data.type);
    this.searchBox = new SearchBox(this.target, this.data.type);
  };

  // 탭메뉴 이벤트
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
