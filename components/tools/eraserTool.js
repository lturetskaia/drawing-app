class EraserTool {
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
  }

  previousMouseX = -1;
  previousMouseY = -1;

  selectedShape = "square"; // 'square' is a default shape

  draw() {
    // console.log(`The selected shape is a ${this.selectedShape}`)
    this.erase();
  }

  erase() {
    if (mouseIsPressed) {
      if (this.previousMouseX == -1) {
        this.previousMouseX = mouseX;
        this.previousMouseY = mouseY;
      } else {
        const strokeWeight = strokeSlider.getEraserWeight();
        push();

        this.selectedShape === "square"
          ? this.eraseSquare(strokeWeight)
          : this.eraseEllipse();
        pop();

        // this.previousMouseX = mouseX;
        // this.previousMouseY = mouseY;
      }
    } else {
      this.previousMouseX = -1;
      this.previousMouseY = -1;
    }
  }

  eraseEllipse() {
    stroke(0);
    line(this.previousMouseX, this.previousMouseY, mouseX, mouseY);
    this.previousMouseX = mouseX;
    this.previousMouseY = mouseY;
  }

  eraseSquare(strokeWeight) {
    fill(0);
    noStroke();
    const mousePosX = mouseX - strokeWeight / 2;
    const mousePosY = mouseY - strokeWeight / 2;
    // distance between current and previous position
    const distX = mousePosX - this.previousMouseX;
    const distY = mousePosY - this.previousMouseY;
    // threshold value for drawing a continuous line
    const threshold = strokeWeight/2 ;

    if (abs(distX) <= threshold && abs(distY) <= threshold) {
      rect(mousePosX, mousePosY, strokeWeight, strokeWeight);
    } else {
      const deltaX = distX / threshold;
      const deltaY = distY / threshold;

      const squaresNum = max(abs(deltaX), abs(deltaY));
      console.log(squaresNum);

      let posX = this.previousMouseX;
      let posY = this.previousMouseY;
      for (let i = 0; i < squaresNum; i++) {
        rect(posX, posY, strokeWeight, strokeWeight);
        posX += deltaX;
        posY += deltaY;
      }
    }
    this.previousMouseX = mousePosX;
    this.previousMouseY = mousePosY;
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
}
