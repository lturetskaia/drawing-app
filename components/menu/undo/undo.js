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
    this.snapshots.prev();
    //disable undo btn if there are no more snapshots to undo
    if (this.snapshots.currentSnapshotIndex === 0) {
      this.#btnChangeState("undo", true);
    }

    //enable redo btn if the current snapshot is not the last element in history
    if (
      this.snapshots.currentSnapshotIndex <
      this.snapshots.history.length - 1
    ) {
      this.#btnChangeState("redo", false);
    }
  }

  #redo() {
    this.snapshots.next();
    //disable redo btn if the current snapshot is the last element in history
    if (
      this.snapshots.currentSnapshotIndex ===
      this.snapshots.history.length - 1
    ) {
      this.#btnChangeState("redo", true);
    }
    //enable undo btn if the currentSnapshotIndex is greater than 0
    if (this.snapshots.currentSnapshotIndex > 0) {
      this.#btnChangeState("undo", false);
    }
  }

  saveSnapshot() {
    this.snapshots.add();
    this.#btnChangeState("undo", false);
  }

  #btnChangeState(btn, disableValue) {
    // change disabled state on a button
    // disableValue should be boolean
    const button = select(`#${btn}Btn`).elt;
    button.disabled = disableValue;
  }
}
