class EraserTool extends ToolItem {
  constructor(name, icon) {
    super(name, icon);
  }

  previousMouseX = -1;
  previousMouseY = -1;
  strokeWeight = 20;

  selectedShape = "square"; // 'square' is a default shape
  squaresAmountMin = 20; // amount of squares drawn to make a contunuous erased line at 100 width
  squaresAmountMax = 700; // amount of squares drawn to make a contunuous erased line at 1px width
  squaresNum = 20;

  draw() {
    this.updateStrokeWidth();
    this.displayCursor();
    // draw on left mouse press
    if (mouseIsPressed && mouseButton === LEFT) {
      this.erase();
    } else {
      this.previousMouseX = -1;
      this.previousMouseY = -1;
    }
  }

  erase() {
    if (this.previousMouseX == -1) {
      this.previousMouseX = mouseX;
      this.previousMouseY = mouseY;
      this.squaresNum = map(this.strokeWeight, 1, 100, 700, 20);
    } else {
      updatePixels(); // remove the cursor image
      push();
      this.selectedShape === "square"
        ? this.eraseSquare()
        : this.eraseEllipse();
      pop();
      loadPixels(); // save the new image

      this.previousMouseX = mouseX;
      this.previousMouseY = mouseY;
    }
  }

  displayCursor() {
    // update and load image for the cursor to move
    updatePixels();
    loadPixels();

    push();
    fill(255);
    stroke(0);
    strokeWeight(1);

    //display cursor depending on the shape of eraser
    if (this.selectedShape === "square") {
      rect(
        mouseX - this.strokeWeight / 2,
        mouseY - this.strokeWeight / 2,
        this.strokeWeight,
        this.strokeWeight
      );
    } else {
      ellipse(mouseX, mouseY, this.strokeWeight, this.strokeWeight);
    }
    pop();
  }

  eraseEllipse() {
    stroke(255);
    line(this.previousMouseX, this.previousMouseY, mouseX, mouseY);
  }

  eraseSquare() {
    fill(255);
    noStroke();

    let prevMouseX = this.previousMouseX - this.strokeWeight / 2;
    let prevMouseY = this.previousMouseY - this.strokeWeight / 2;
    const mousePosX = mouseX - this.strokeWeight / 2;
    const mousePosY = mouseY - this.strokeWeight / 2;
    // distance between current and previous position
    const distX = mousePosX - prevMouseX;
    const distY = mousePosY - prevMouseY;
    // threshold value for drawing a sequence of squares
    const threshold = this.strokeWeight / 2;

    if (abs(distX) <= threshold && abs(distY) <= threshold) {
      rect(mousePosX, mousePosY, this.strokeWeight, this.strokeWeight);
    } else {
      // distance between squares for X and Y
      const deltaX = distX / this.squaresNum;
      const deltaY = distY / this.squaresNum;

      // draw
      for (let i = 0; i < this.squaresNum; i++) {
        rect(prevMouseX, prevMouseY, this.strokeWeight, this.strokeWeight);
        prevMouseX += deltaX;
        prevMouseY += deltaY;
      }
    }
  }

  populateOptions() {
    console.log("Populating options");

    //add shape select element
    this.addShapeSelect();
  }

  addShapeSelect() {
    // create a label for select element
    const dropdownLabel = createElement("label", "Shape: ");
    dropdownLabel.attribute("for", "dropdown");
    select(".options").child(dropdownLabel);

    // create a select element with 2 options
    const dropdown = createSelect();
    dropdown.id("dropdown");
    select(".options").child(dropdown);
    dropdown.option("square");
    dropdown.option("ellipse");
    dropdown.selected("square");

    //add dropdown event handler
    //change selectedShape to the selected value
    dropdown.changed(() => (this.selectedShape = dropdown.selected()));
  }

  unselectTool() {
    console.log("Unselect eraser");
    //clear options
    select(".options").html("");
    // change slider mode back to 'brush'
    strokeSlider.changeMode("brush");
  }

  updateStrokeWidth() {
    const eraserWeight = select("#strokeSliderInput").value();
    if (this.strokeWeight !== eraserWeight) {
      this.strokeWeight = eraserWeight;
    }
  }
}
