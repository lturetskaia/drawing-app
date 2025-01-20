class EditableImage {
  constructor(x, y, image) {
    this.selectedArea = {
      x: x,
      y: y,
      width: mouseX - x,
      height: mouseY - y,
      shiftX: 0,
      shiftY: 0,
    };

    this.image = get(x, y, this.selectedArea.width, this.selectedArea.height);
  }

  copy() {}

  delete() {
    push();
    fill(255);
    noStroke();
    rect(
      this.selectedArea.x,
      this.selectedArea.y,
      this.selectedArea.width,
      this.selectedArea.height
    );
    pop();
  }

  move() {
    console.log("Moving");
    this.selectedArea.x = mouseX - this.selectedArea.shiftX;
    this.selectedArea.y = mouseY - this.selectedArea.shiftY;
    set(this.selectedArea.x, this.selectedArea.y, this.image);

  }

  cut() {}

  paste() {
    set(mouseX, mouseY, this.image);
    this.selectedArea.x = mouseX;
    this.selectedArea.y = mouseY;
  }

  calculateMouseShift() {
    this.selectedArea.shiftX = mouseX - this.selectedArea.x;
    this.selectedArea.shiftY = mouseY - this.selectedArea.y;
    console.log(this.selectedArea.shiftX, this.selectedArea.shiftY);
  }
}
