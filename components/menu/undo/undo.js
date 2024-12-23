class Undo extends MenuItem {
  constructor(name, icon, type) {
    super(name, icon, type);
  }
  // array of recent changes
  // by default has one snapshot of clear canvas
  snapshots = [];

  click(optionName) {
    if (optionName === "undo") {
      this.#undo();
    } else {
      this.#redo();
    }
  }

  #undo() {
    console.log(`Undo clicked!`);
  }

  #redo() {
    console.log(`Redo clicked!`);
  }

  btnChangeState(optionName) {}
}
