class App {
  constructor(target) {
    this.target = target;
    this.render();
  }

  render() {
    this.target.innerHTML = `
            TEST
        `;
  }
}

export default App;
