class Undo extends MenuItem {
  constructor(name, icon, type) {
    super(name, icon, type);
    // array of recent changes
    // by default has one snapshot of clear canvas
    this.snapshots = new UndoSnapshots();
  }

  click(option) {
    if (option === "undo") {
      this.#undo();
    } else {
      this.#redo();
    }
  }

  #undo() {
    console.log(`Undo clicked!`);
    this.snapshots.prev();
  }

  #redo() {
    console.log(`Redo clicked!`);
  }

  saveFrame() {
    this.snapshots.add();
  }

  btnChangeState(option) {}
}
