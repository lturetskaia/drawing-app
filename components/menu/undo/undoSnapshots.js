// class for storing and manipulating undo snapshots
class UndoSnapshots {
  constructor() {
    this.history = [];
    this.history.push(get());
    this.currentSnapshotIndex = 0;
    this.maxAmount = 10;
  }

  add() {
    const newSnapshot = get();

    if (this.currentSnapshotIndex === this.history.length - 1) {
      // when the current snapshot is the latest snapshot saved (no undo was done)
      // and the history array is not full, push a new snapshot to history

      if (this.history.length < this.maxAmount) {
        this.history.push(newSnapshot);
        this.currentSnapshotIndex += 1;
      } else {
        // if the history array is full
        // delete the first(oldest) snapshot and push a new snapshot to history

        this.history.shift();
        this.history.push(newSnapshot);
      }
    } else {
      // if undo was done previously, delete the undone changes
      // and push a new snapshot

      this.history.splice(this.currentSnapshotIndex + 1);
      this.history.push(newSnapshot);
      this.currentSnapshotIndex += 1;
    }
  }

  prev() {
    if (this.currentSnapshotIndex > 0) {
      //if the current snapshot is not the oldest snapshot saved
      // switch to the previous snapshot
      console.log(this.currentSnapshotIndex);
      const prevSnapshot = this.history[this.currentSnapshotIndex - 1];
      set(0, 0, prevSnapshot);
      this.currentSnapshotIndex -= 1;
      console.log(this.currentSnapshotIndex);
      console.log(this.history);
    }
  }

  next() {
    if (this.currentSnapshotIndex < this.history.length - 1) {
      // if the current snapshot is not the last snapshot saved
      // switch to the next snapshot
      const nextSnapshot = this.history[this.currentSnapshotIndex + 1];
      set(0, 0, nextSnapshot);
      // updatePixels();
      this.currentSnapshotIndex += 1;
    }
  }
}
