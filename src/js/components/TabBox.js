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

  init = () => {
    this.tabMenu();
  };

  tabMenu = () => {
    this.tabBox.addEventListener("click", this.tabEvent);
  };

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
