class EditableImage {
  constructor(area) {
    this.selectedArea = {
      x: area.x,
      y: area.y,
      width: area.width,
      height: area.height,
      shiftX: 0,
      shiftY: 0,
    };
    // if width, height ot both are less than 0
    // flip the starting points x and y to the upper left corner of the selection
    if (area.width < 0 && area.height < 0) {
      this.selectedArea.x = area.x + area.width;
      this.selectedArea.y = area.y + area.height;
      this.selectedArea.width *= -1;
      this.selectedArea.height *= -1;
    } else if (area.width < 0) {
      this.selectedArea.x = area.x + area.width;
      this.selectedArea.width *= -1;
    } else if (area.height < 0) {
      this.selectedArea.y = area.y + area.height;
      this.selectedArea.height *= -1;
    }

    this.image = get(
      this.selectedArea.x,
      this.selectedArea.y,
      this.selectedArea.width,
      this.selectedArea.height
    );
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
