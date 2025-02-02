class ShapeTool extends ToolItem {
  constructor(name) {
    super(name);
  }

  // starting point of a rectangle
  // set to default value -1
  startMouseX = -1;
  startMouseY = -1;
  currentShape = "rectangle";

  draw() {
    //check if mouse is in drawing position
    let mouseOverCanvas =
      mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseX < height;
    if (mouseOverCanvas) {
      cursor(CROSS);
    }
    if (mouseIsPressed && mouseButton === LEFT && mouseOverCanvas) {
      if (this.startMouseX === -1) {
        // initialize the starting point of a rectangle
        this.startMouseX = mouseX;
        this.startMouseY = mouseY;
        loadPixels();
        // save the state of pixels
      } else {
        // display the last saved state of pixels
        updatePixels();

        this.#drawShape();

        this.#drawSizeLabel();
      }
    } else {
      if (this.startMouseX !== -1) {
        // when the drawing is done display the previous state before drawing
        // this is needed to erase the dimesions label
        updatePixels();
        // draw the final version of the rectangle
        this.#drawShape();

        saveUndoSnapshot();

        //reset the initial drawing point to default
        this.startMouseX = -1;
        this.startMouseY = -1;
      }
    }
  }

  populateOptions() {
    //create div for shape buttons
    const shapesDiv = createDiv();
    shapesDiv.id("shapes");
    select(".options").child(shapesDiv);
    //event handler for bubbling events on shape buttons
    shapesDiv.mouseClicked((event) =>
      event.target.localName === "img" ? this.#selectShape(event.target) : null
    );
    this.#addButton("rectangle");
    select("#rectangleBtn").addClass("active");
    this.#addButton("circle");
    this.#addButton("triangle");
    this.#addButton("heart");
  }

  unselectTool() {
    cursor(ARROW);
    select(".options").html("");
    updatePixels();
  }

  #selectShape(target) {
    select("#" + this.currentShape + "Btn").removeClass("active");

    this.currentShape = target.id.slice(0, -3); // get the id minus 3 last characters

    select("#" + this.currentShape + "Btn").addClass("active"); // add blue border
  }

  #drawShape() {
    if (this.currentShape === "rectangle") {
      rect(
        this.startMouseX,
        this.startMouseY,
        mouseX - this.startMouseX,
        mouseY - this.startMouseY
      );
    } else if (this.currentShape === "circle") {
      ellipse(
        this.startMouseX + (mouseX - this.startMouseX) / 2,
        this.startMouseY + (mouseY - this.startMouseY) / 2,
        mouseX - this.startMouseX,
        mouseY - this.startMouseY
      );
    } else if (this.currentShape === "triangle") {
      triangle(
        this.startMouseX,
        mouseY,
        this.startMouseX + (mouseX - this.startMouseX) / 2,
        this.startMouseY,
        mouseX,
        mouseY
      );
    } else if (this.currentShape === "heart") {
      beginShape();
      vertex(this.startMouseX, this.startMouseY);
      bezierVertex(
        this.startMouseX - (mouseX - this.startMouseX)/2,
        this.startMouseY - (mouseY - this.startMouseY)/2,
        this.startMouseX - (mouseX - this.startMouseX),
        this.startMouseY + (mouseY - this.startMouseY)/4,
        this.startMouseX,
        this.startMouseY + (mouseY - this.startMouseY)
      ); // left part
      bezierVertex(
        this.startMouseX + (mouseX - this.startMouseX),
        this.startMouseY + (mouseY - this.startMouseY)/4,
        this.startMouseX + (mouseX - this.startMouseX)/2,
        this.startMouseY - (mouseY - this.startMouseY)/2,
        this.startMouseX,
        this.startMouseY
      ); // right part
      endShape();
    }
  }

  #drawSizeLabel() {
    push();
    fill(0);
    noStroke();
    textSize(14);
    text(
      `${abs(mouseX - this.startMouseX)} x ${abs(mouseY - this.startMouseY)}`,
      mouseX + 5,
      mouseY - 5
    );
    pop();
  }

  #addButton(name) {
    const icon = `assets/${name}.png`;
    //create a button
    const newBtn = createButton("");
    newBtn.id(`${name}Btn`);
    // select(".options").child(newBtn);
    select("#shapes").child(newBtn);

    // add button icon
    const buttonImg = createImg(icon, name);
    buttonImg.id(`${name}Img`);
    buttonImg.parent(`${name}Btn`);
  }
}
