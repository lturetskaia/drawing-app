class EditImageTool extends ToolItem {
  constructor(name) {
    super(name);
    this.mode = "select"; // 'select' is the default mode
    this.image = null; // no selected image by default
    this.startMouseX = -1;
    this.startMouseY = -1;
  }

  draw() {
    let mouseOverCanvas =
      mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseX < height;

      // mode 'select' - select the area, then save it to this.image
    if (
      mouseOverCanvas &&
      mouseIsPressed &&
      mouseButton === LEFT &&
      this.mode === "select"
    ) {
      this.select();
    } else if (this.startMouseX !== -1 && this.mode === "select") {
      this.saveSelectedArea();
    }

    //
    // cursor(CROSS);
  }

  populateOptions() {
    this.addButton("copy");
    this.addButton("delete");
    this.addButton("cut");
    this.addButton("paste");
  }

  select() {
    // selects an area for editing
    console.log("selecting");
    if (this.startMouseX === -1) {
      // initialize the starting point of the selection
      this.startMouseX = mouseX;
      this.startMouseY = mouseY;

      // save the state of the canvas
      loadPixels();
    } else {
      // display the last saved state of pixels
      updatePixels();

      push();
      drawingContext.setLineDash([5, 5]); // make lines dashed
      fill(255, 255, 255, 0);

      rect(
        this.startMouseX,
        this.startMouseY,
        mouseX - this.startMouseX,
        mouseY - this.startMouseY
      );
      pop();
    }
  }

  saveSelectedArea() {
    //construct a new editable object
    this.image = new EditableImage(this.startMouseX, this.startMouseY);
    console.log(this.image);
    // resert the start values to default
    this.startMouseX = -1;
    this.startMouseY = -1;
    this.mode = 'edit';
  }

  addButton(name) {
    const icon = `assets/${name}.jpg`;
    //create a button
    const newBtn = createButton("");
    newBtn.id(`${name}Btn`);
    select(".options").child(newBtn);
    //disable the buttons by default
    select(`#${name}Btn`).attribute("disabled", "true");

    // add button icon
    const buttonImg = createImg(icon, name);
    buttonImg.id(`${name}Img`);
    buttonImg.parent(`${name}Btn`);
  }

  unselectTool() {
    console.log("Unselect edit image");
    //clear options
    select(".options").html("");
  }
}
