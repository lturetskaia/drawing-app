class EditImageTool extends ToolItem {
  constructor(name) {
    super(name);
    this.mode = "select"; // 'select' is the default mode
    this.image = null; // no selected image by default
    this.startMouseX = -1;
    this.startMouseY = -1;
    this.savedCanvas = null;
  }

  draw() {   
    const mouseOverCanvas =
      mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;

    //define cursor shape
    if (this.mode === "select") {
      cursor(CROSS);
    } else {
      cursor(ARROW);
    }

    // switching between modes logic
    if (this.mode === "edit") {
      // if edit mode is active
      //check if mouse is over the selected area
      const mouseOverImage =
        mouseX >= this.image.selectedArea.x &&
        mouseX < this.image.selectedArea.x + this.image.selectedArea.width &&
        mouseY >= this.image.selectedArea.y &&
        mouseY < this.image.selectedArea.y + this.image.selectedArea.height;
      if (mouseOverImage) {
        cursor(MOVE);
      }

      if (mouseOverImage && mouseIsPressed && mouseButton === LEFT) {
        //if mouse is pressed over the selected area, switch to mode 'move'
        this.mode = "move";
        //calculate mouse shift relative to the starting point of the image
        this.image.calculateMouseShift();
        updatePixels(); // clear selection marks
        this.image.delete(); // delete the moved image at initial position
        this.savedCanvas = get(); // save the state  of canvas before moving
        console.log("Move image");
      }
    } else if (this.mode === "move") {
      if (mouseIsPressed) {
        //if the mouse is pressed in move mode
        // update canvas from the initial state before moving
        set(0, 0, this.savedCanvas);
        this.image.move(); // move the image
        this.markSelectedArea(this.image.selectedArea);// mark the selected area
      } else {
        // if mouse was released while moving
        // update canvas from the initial state before moving
        set(0, 0, this.savedCanvas);
        // apply the last move
        this.image.move();
        loadPixels(); // save the new pixels array
        saveUndoSnapshot(); // save an undo snapshot
        this.markSelectedArea(this.image.selectedArea); // add selection visualization
        // return to edit mode
        this.mode = "edit";
        console.log("edit mode");
      }
    } else if (
      mouseOverCanvas &&
      mouseIsPressed &&
      mouseButton === LEFT &&
      this.mode === "select"
    ) {
      //if the mouse was pressed in select mode
      // display selection
      this.selectArea();
    } else if (
      !mouseIsPressed &&
      this.startMouseX !== -1 &&
      this.mode === "select"
    ) {
       //if the mouse was released after area selection
      // display selection
      updatePixels(); // remove selection visualization
      this.saveSelectedArea(); // save the selected image
    }
  }

  populateOptions() {
    //add option buttons and event handlers
    this.addButton("copy");
    select("#copyBtn").mouseClicked(() => this.copyImage());
    this.addButton("delete");
    select("#deleteBtn").mouseClicked(() => this.deleteImage());
    this.addButton("cut");
    select("#cutBtn").mouseClicked(() => this.cutImage());
    this.addButton("paste");
    select("#pasteBtn").mouseClicked(() => this.activatePaste());
    this.addButton("cancelSelection");
    select("#cancelSelectionBtn").mouseClicked(() => this.cancelSelection());
  }

  selectArea() {
    // selects an area for editing
    if (this.startMouseX === -1) {
      // initialize the starting point of the selection
      this.startMouseX = mouseX;
      this.startMouseY = mouseY;

      // save the state of the canvas
      loadPixels();
    } else {
      // display the last saved state of pixels
      updatePixels();
      const adjustedArea = this.getAdjustedArea();
      this.markSelectedArea(adjustedArea); // add selection visualization
    }
  }

  markSelectedArea(selectedArea) {
    // mark the selected area with dashed lines
    push();
    stroke(0);
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]); // make lines dashed
    fill(255, 255, 255, 0);
    rect(
      selectedArea.x,
      selectedArea.y,
      selectedArea.width,
      selectedArea.height
    );
    pop();
  }

  adjustArea(selectedArea) {
    //checks if the area is within the canvas boundaries
    // adjusts it if it's not and returns a valid area object

    if (selectedArea.x + selectedArea.width < 0) {
      selectedArea.width = -selectedArea.x;
    } else if (selectedArea.x + selectedArea.width > width) {
      selectedArea.width = width - selectedArea.x;
    }

    if (selectedArea.y + selectedArea.height < 0) {
      selectedArea.height = -selectedArea.y;
    } else if (selectedArea.y + selectedArea.height > height) {
      selectedArea.height = height - selectedArea.y;
    }
    return selectedArea;
  }

  getAdjustedArea(){
    //gets the selected area, adjust it to fit the canvas boundaries
    //and return the adjustedArea object
    const selectedArea = {
      x: this.startMouseX,
      y: this.startMouseY,
      width: mouseX - this.startMouseX,
      height: mouseY - this.startMouseY,
    };
    const adjustedArea = this.adjustArea(selectedArea);
    return adjustedArea;
  }

  saveSelectedArea() {
     const adjustedArea = this.getAdjustedArea();

    //construct a new editable object;
    this.image = new EditableImage(adjustedArea);
    console.log(this.image);
    // resert the start values to default
    this.startMouseX = -1;
    this.startMouseY = -1;

    this.markSelectedArea(this.image.selectedArea); // add selection visualization

    this.mode = "edit";

    // make copy, delete and cut buttons active
    this.changeBtnState("copy", false);
    this.changeBtnState("delete", false);
    this.changeBtnState("cut", false);
    this.changeBtnState("cancelSelection", false);
  }

  copyImage() {
    this.mode = "copy";
    this.changeBtnState("copy", true);
    this.changeBtnState("delete", true);
    this.changeBtnState("cut", true);
    this.changeBtnState("paste", false);
  }

  pasteImage() {
    // if canvas is clicked while in 'paste' mode
    updatePixels(); // clear the selection frame
    this.image.paste(); // paste the image
    loadPixels(); // save
    console.log("Snapshot saved");
    saveUndoSnapshot(); // make an undo snapshot
    this.markSelectedArea(this.image.selectedArea);
    console.log("paste end");
  }

  deleteImage() {
    updatePixels(); // clear the selection frame
    this.image.delete();
    loadPixels(); // save the new image
    saveUndoSnapshot(); // save a snapshot
    //reset to select mode
    this.cancelSelection();
  }

  cutImage() {
    updatePixels();
    this.image.delete();
    loadPixels();
    // this.activatePaste();
    this.changeBtnState("copy", true);
    this.changeBtnState("delete", true);
    this.changeBtnState("cut", true);
    this.changeBtnState("paste", false);
  }

  cancelSelection() {
    updatePixels();
    this.image = null;
    this.mode = "select";
    this.changeBtnState("copy", true);
    this.changeBtnState("delete", true);
    this.changeBtnState("cut", true);
    this.changeBtnState("paste", true);
    this.changeBtnState("cancelSelection", true);
  }

  activatePaste() {
    // switches to paste mode
    this.mode = "paste";
    this.changeBtnState("paste", false);
    this.changeBtnState("cancelSelection", false);
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
    cursor(ARROW);
    console.log("Unselect edit image");
    this.mode = "select";
    this.image = null;
    // this.startMouseX = -1;
    // this.startMouseY = -1;
    updatePixels();
    //clear options
    select(".options").html("");
  }
}
