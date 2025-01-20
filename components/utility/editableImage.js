class EditableImage {
  constructor(x, y, image) {
    this.selectedArea = {
      x: x,
      y: y,
      width: mouseX - x,
      height: mouseY - y,
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

  cut() {}

  paste() {
    set(mouseX, mouseY, this.image);
    this.selectedArea.x = mouseX;
    this.selectedArea.y = mouseY;
  }
}
