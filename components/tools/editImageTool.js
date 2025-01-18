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
      updatePixels(); // remove selection visualization
      this.saveSelectedArea(); // save the selected image
      this.markSelectedArea(this.image.selectedArea.x, this.image.selectedArea.y); // add selection visualization
      // make copy, delete and cut buttons active
      this.changeBtnState("copy", false);
      this.changeBtnState("delete", false);
      this.changeBtnState("cut", false);
    }
  }

  populateOptions() {
    //add buttons and event handlers
    this.addButton("copy");
    select("#copyBtn").mouseClicked(() => this.copyImage());
    this.addButton("delete");
    select("#deleteBtn").mouseClicked(() => this.deleteImage());
    this.addButton("cut");
    select("#cutBtn").mouseClicked(() => this.cutImage());
    this.addButton("paste");
    select("#copyBtn").mouseClicked(() => this.pasteImage());
    this.addButton("cancelSelection");
    select("#cancelSelectionBtn").mouseClicked(() => this.cancelSelection());

    //add even handler for canvas
    select("canvas").mouseClicked(() => {
      if (this.mode === "paste") {
        this.image.paste();
      }
    });
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

      this.markSelectedArea(this.startMouseX, this.startMouseY);
    }
  }

  markSelectedArea(x, y) {
    // mark the selected area with dashed lines
    push();
    drawingContext.setLineDash([5, 5]); // make lines dashed
    fill(255, 255, 255, 0);

    rect(x, y, mouseX - x, mouseY - y);
    pop();
  }

  saveSelectedArea() {
    //construct a new editable object
    this.image = new EditableImage(this.startMouseX, this.startMouseY);
    console.log(this.image);
    // resert the start values to default
    this.startMouseX = -1;
    this.startMouseY = -1;
    this.mode = "edit";
  }

  copyImage() {
    this.mode = "copy";
    this.changeBtnState("copy", true);
    this.changeBtnState("delete", true);
    this.changeBtnState("cut", true);
    this.changeBtnState("paste", false);
  }

  pasteImage() {
    this.mode = "paste";
    this.changeBtnState("paste", false);
  }

  addButton(name) {
    const icon = `assets/${name}.png`;
    //create a button
    const newBtn = createButton("");
    newBtn.id(`${name}Btn`);
    select(".options").child(newBtn);
    //disable the buttons by default
    newBtn.attribute("disabled", "true");

    // add button icon
    const buttonImg = createImg(icon, name);
    buttonImg.id(`${name}Img`);
    buttonImg.parent(`${name}Btn`);
  }

  changeBtnState(btn, disableValue) {
    //make buttons active/disabled
    const button = select(`#${btn}Btn`).elt;
    button.disabled = disableValue;
  }

  unselectTool() {
    console.log("Unselect edit image");
    //clear options
    select(".options").html("");
  }
}
