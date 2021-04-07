class TabBox {
  constructor(target, tabEvent, type) {
    this.target = target;
    this.tabEvent = tabEvent;
    this.type = type;
    this.tabBox = document.createElement("nav");
    this.tabBox.classList = "tab-box";
    this.target.appendChild(this.tabBox);

    this.render();
    this.init();
  }

  // 최초로 생성되었을 때만 탭메뉴 이벤트 등록
  init = () => {
    this.tabMenu();
  };

  // 타입이 바뀌면 tabBox 새로 렌더링
  setType = (type) => {
    this.type = type;
    this.render();
  };

  tabMenu = () => {
    this.tabBox.addEventListener("click", this.tabEvent);
  };

  // 타입에 따라 다르게 렌더링
  render() {
    return (this.tabBox.innerHTML = `
      <button class=${
        this.type === "GITHUB" ? "active" : false
      } data-type="GITHUB">전체</button>
      <button class=${
        this.type === "FAVORITE" ? "active" : false
      } data-type="FAVORITE">즐겨찾기</button>
    `);
  }
}

export default TabBox;
