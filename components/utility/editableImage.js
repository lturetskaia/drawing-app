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

  delete() {
    //delete the image by drawing a white rectangle over it
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
    //move the image with the mouse
    this.selectedArea.x = mouseX - this.selectedArea.shiftX;
    this.selectedArea.y = mouseY - this.selectedArea.shiftY;
    set(this.selectedArea.x, this.selectedArea.y, this.image);
  }

  resize(border) {
    //resizes the image depending on the dragged border/angle
    if (border === "e") {
      this.resizeRight();
    } else if (border === "w") {
      this.resizeLeft();
    } else if (border === "n") {
      this, this.resizeTop();
    } else if (border === "s") {
      this.resizeBottom();
    } else if (border === "ne") {
      this.resizeTop();
      this.resizeRight();
    } else if (border === "nw") {
      this.resizeTop();
      this.resizeLeft();
    } else if (border === "se") {
      this.resizeBottom();
      this.resizeRight();
    } else if (border === "sw") {
      this.resizeBottom();
      this.resizeLeft();
    }

    image(
      this.image,
      this.selectedArea.x,
      this.selectedArea.y,
      this.selectedArea.width,
      this.selectedArea.height
    );
  }

  resizeLeft() {
    //resize the left border / west
    let newWidth;

    //limit resize to the left edge of the canvas
    if (mouseX < 0) {
      newWidth = this.selectedArea.width + this.selectedArea.x;
      this.selectedArea.x = 0;
    } else {
      newWidth = this.selectedArea.x - mouseX + this.selectedArea.width;
      this.selectedArea.x = mouseX;
    }
    this.selectedArea.width = newWidth;
  }

  resizeRight() {
    //resize the right border / east
    let newWidth = mouseX - this.selectedArea.x;
    const rigthEdge = this.selectedArea.x + newWidth;

    //limit resize to the right edge of the canvas
    if (rigthEdge > width) {
      newWidth = width - this.selectedArea.x - 1;
    }
    this.selectedArea.width = newWidth;
  }

  resizeTop() {
    //resize the top border / north
    let newHeight;

    //limit resize to the top edge of the canvas
    if (mouseY < 0) {
      newHeight = this.selectedArea.height + this.selectedArea.y;
      this.selectedArea.y = 0;
    } else {
      newHeight = this.selectedArea.y - mouseY + this.selectedArea.height;
      this.selectedArea.y = mouseY;
    }
    this.selectedArea.height = newHeight;
  }

  resizeBottom() {
    //resize the bottom border / south
    let newHeight = mouseY - this.selectedArea.y;
    const bottomEdge = this.selectedArea.y + newHeight;

    //limit resize to the bottom edge of the canvas
    if (bottomEdge > height) {
      newHeight = height - this.selectedArea.y - 1;
    }
    this.selectedArea.height = newHeight;
  }

  paste() {
    //paste the image at the indicated point
    set(mouseX, mouseY, this.image);
    this.selectedArea.x = mouseX;
    this.selectedArea.y = mouseY;
  }

  calculateMouseShift() {
    // calculates the shift of the image with respect to the mouse
    this.selectedArea.shiftX = mouseX - this.selectedArea.x;
    this.selectedArea.shiftY = mouseY - this.selectedArea.y;
  }
}
