class Header {
  constructor(target) {
    this.target = target;
    this.header = document.createElement("header");
    this.header.classList = "header-box";
    this.target.appendChild(this.header);

    this.render();
  }

  render() {
    return (this.header.innerHTML = `
        <h1><span class="point">GitHub</span> 사용자 검색기</h1>
    `);
  }
}

export default Header;
