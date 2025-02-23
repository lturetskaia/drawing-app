class SelectTool extends ToolItem {
  constructor(name) {
    super(name);
    this.mode = "select"; // 'select' is the default mode
    this.image = null; // no selected image by default
    this.startMouseX = -1;
    this.startMouseY = -1;
    this.savedCanvas = null; // selected part of the canvas
    this.padding = 5; // padding of the image for cursor shape change
    this.resize = null; // resize direction
  }

  draw() {
    const mouseOverCanvas =
      mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;

    //define cursor shape
    if (this.mode === "select") {
      cursor(CROSS);
    } else if (this.mode === "resize") {
      this.#displayResizeCursor(this.resize);
    } else {
      cursor(ARROW);
    }

    // switching between modes logic
    if (this.mode === "edit" && mouseOverCanvas) {
      //perform editing logic
      this.#editImage();
    } else if (this.mode === "move") {
      //perform moving logic
      this.#moveImage();
    } else if (this.mode === "resize") {
      this.#resizeImage();
    } else if (
      mouseOverCanvas &&
      mouseIsPressed &&
      mouseButton === LEFT &&
      this.mode === "select"
    ) {
      //if the mouse was pressed in select mode, display selection
      this.#selectArea();
    } else if (
      !mouseIsPressed &&
      this.startMouseX !== -1 &&
      this.mode === "select"
    ) {
      //if the mouse was released after area selection
      updatePixels(); // remove selection visualization
      this.#saveSelectedArea(); // save the selected image
    }
  }

  populateOptions() {
    //add option buttons and event handlers
    this.#addButton("copy");
    select("#copyBtn").mouseClicked(() => this.#copyImage());
    this.#addButton("delete");
    select("#deleteBtn").mouseClicked(() => this.#deleteImage());
    this.#addButton("cut");
    select("#cutBtn").mouseClicked(() => this.#cutImage());
    this.#addButton("paste");
    select("#pasteBtn").mouseClicked(() => this.#activatePaste());
    this.#addButton("cancel");
    select("#cancelBtn").mouseClicked(() => this.#cancelSelection());
  }

  unselectTool() {
    cursor(ARROW);
    select(".options").html("");
    this.mode = "select";
    this.image = null;
    updatePixels();
    //clear options
    select(".options").html("");
  }

  #selectArea() {
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
      const adjustedArea = this.#getAdjustedArea();
      this.#markSelectedArea(adjustedArea); // add selection visualization
    }
  }

  #editImage() {
    // if edit mode is active check if mouse is over the image,
    // borders or outside of the selection
    const mouseOverSelection = this.#detectMousePosition();

    if (mouseOverSelection) {
      if (mouseOverSelection === "image") {
        cursor(MOVE);
      }

      this.#displayResizeCursor(mouseOverSelection);

      if (
        mouseOverSelection === "image" &&
        mouseIsPressed &&
        mouseButton === LEFT
      ) {
        //if mouse is pressed over the selected area, switch to mode 'move'
        this.mode = "move";
        //calculate mouse shift relative to the starting point of the image
        this.image.calculateMouseShift();
        updatePixels(); // clear selection marks
      } else if (
        mouseOverSelection &&
        mouseIsPressed &&
        mouseButton === LEFT &&
        this.mode !== "resize"
      ) {
        this.mode = "resize";
        this.resize = mouseOverSelection;
        updatePixels(); // clear selection marks
      }
    }
  }

  #detectMousePosition() {
    // checks if the mouse is over the selection. Returns:
    //  false - if the image is outside of the selection
    // 'image' - if it'd over the image (ie in move position)
    // 'w', 'e', 'n', 's' - if it's over a border
    // 'ne', 'nw', 'se', 'sw' - if it's over an angle

    /// detect if the  mouse is outside of the selected area
    const mouseOutside =
      mouseX <= this.image.selectedArea.x - this.padding ||
      mouseX >=
        this.image.selectedArea.x +
          this.image.selectedArea.width +
          this.padding ||
      mouseY <= this.image.selectedArea.y - this.padding ||
      mouseY >=
        this.image.selectedArea.y +
          this.image.selectedArea.height +
          this.padding;

    if (mouseOutside) {
      return false;
    }

    // detect if the mouse is over the image (in move position)
    const mouseOverImage =
      mouseX >= this.image.selectedArea.x + this.padding &&
      mouseX <=
        this.image.selectedArea.x +
          this.image.selectedArea.width -
          this.padding &&
      mouseY >= this.image.selectedArea.y + this.padding &&
      mouseY <=
        this.image.selectedArea.y +
          this.image.selectedArea.height -
          this.padding;
    if (mouseOverImage) {
      return "image";
    }

    // detect the top border
    const mouseOverTopBorder =
      mouseY < this.image.selectedArea.y + this.padding &&
      mouseY > this.image.selectedArea.y - this.padding &&
      mouseX > this.image.selectedArea.x + this.padding &&
      mouseX <
        this.image.selectedArea.x +
          this.image.selectedArea.width -
          this.padding;
    if (mouseOverTopBorder) {
      return "n";
    }

    // detect the bottom border
    const mouseOverBottomBorder =
      mouseY <
        this.image.selectedArea.y +
          this.image.selectedArea.height +
          this.padding &&
      mouseY >
        this.image.selectedArea.y +
          this.image.selectedArea.height -
          this.padding &&
      mouseX > this.image.selectedArea.x + this.padding &&
      mouseX <
        this.image.selectedArea.x +
          this.image.selectedArea.width -
          this.padding;
    if (mouseOverBottomBorder) {
      return "s";
    }

    // detect the left border
    const mouseOverLeftBorder =
      mouseX < this.image.selectedArea.x + this.padding &&
      mouseX > this.image.selectedArea.x - this.padding &&
      mouseY > this.image.selectedArea.y + this.padding &&
      mouseY <
        this.image.selectedArea.y +
          this.image.selectedArea.height -
          this.padding;
    if (mouseOverLeftBorder) {
      return "w";
    }

    // detect the right border
    const mouseOverRightBorder =
      mouseX <
        this.image.selectedArea.x +
          this.image.selectedArea.width +
          this.padding &&
      mouseX >
        this.image.selectedArea.x +
          this.image.selectedArea.width -
          this.padding &&
      mouseY > this.image.selectedArea.y + this.padding &&
      mouseY <
        this.image.selectedArea.y +
          this.image.selectedArea.height -
          this.padding;
    if (mouseOverRightBorder) {
      return "e";
    }

    // detect top right angle
    const mouseOverTopRight =
      mouseX >=
        this.image.selectedArea.x +
          this.image.selectedArea.width -
          this.padding &&
      mouseX <=
        this.image.selectedArea.x +
          this.image.selectedArea.width +
          this.padding &&
      mouseY >= this.image.selectedArea.y - this.padding &&
      mouseY <= this.image.selectedArea.y + this.padding;

    if (mouseOverTopRight) {
      return "ne";
    }

    // detect top left angle
    const mouseOverTopLeft =
      mouseX >= this.image.selectedArea.x - this.padding &&
      mouseX <= this.image.selectedArea.x + this.padding &&
      mouseY >= this.image.selectedArea.y - this.padding &&
      mouseY <= this.image.selectedArea.y + this.padding;

    if (mouseOverTopLeft) {
      return "nw";
    }

    // detect bottom left angle
    const mouseOverBottomLeft =
      mouseX >= this.image.selectedArea.x - this.padding &&
      mouseX <= this.image.selectedArea.x + this.padding &&
      mouseY >=
        this.image.selectedArea.y +
          this.image.selectedArea.height -
          this.padding &&
      mouseY <=
        this.image.selectedArea.y +
          this.image.selectedArea.height +
          this.padding;

    if (mouseOverBottomLeft) {
      return "sw";
    }

    // detect bottom right angle
    const mouseOverBottomRight =
      mouseX >=
        this.image.selectedArea.x +
          this.image.selectedArea.width -
          this.padding &&
      mouseX <=
        this.image.selectedArea.x +
          this.image.selectedArea.width +
          this.padding &&
      mouseY >=
        this.image.selectedArea.y +
          this.image.selectedArea.height -
          this.padding &&
      mouseY <=
        this.image.selectedArea.y +
          this.image.selectedArea.height +
          this.padding;

    if (mouseOverBottomRight) {
      return "se";
    }
  }

  #moveImage() {
    if (mouseIsPressed) {
      //if the mouse is pressed in move mode
      // update canvas from the initial state before moving
      set(0, 0, this.savedCanvas);
      this.image.move(); // move the image
      this.#markSelectedArea(this.image.selectedArea); // mark the selected area
    } else {
      // if mouse was released while moving
      // update canvas from the initial state before moving
      set(0, 0, this.savedCanvas);
      // apply the last move
      this.image.move();
      saveUndoSnapshot(); // save an undo snapshot
      this.#markSelectedArea(this.image.selectedArea); // add selection visualization
      // return to edit mode
      this.mode = "edit";
    }
  }

  #resizeImage() {
    if (mouseIsPressed) {
      set(0, 0, this.savedCanvas);
      this.image.resize(this.resize);
      this.#markSelectedArea(this.image.selectedArea); // mark the selected area
    } else {
      set(0, 0, this.savedCanvas);
      this.image.resize(this.resize);
      saveUndoSnapshot(); // save an undo snapshot
      this.image = new EditableImage(this.image.selectedArea);
      this.#markSelectedArea(this.image.selectedArea); // add selection visualization
      this.mode = "edit";
    }
  }

  #markSelectedArea(selectedArea) {
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

  #adjustArea(selectedArea) {
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

  #getAdjustedArea() {
    //gets the selected area, adjust it to fit the canvas boundaries
    //and return the adjustedArea object
    const selectedArea = {
      x: this.startMouseX,
      y: this.startMouseY,
      width: mouseX - this.startMouseX,
      height: mouseY - this.startMouseY,
    };
    const adjustedArea = this.#adjustArea(selectedArea);
    return adjustedArea;
  }

  #saveSelectedArea() {
    const adjustedArea = this.#getAdjustedArea();

    //construct a new editable object;
    this.image = new EditableImage(adjustedArea);
    // resert the start values to default
    this.startMouseX = -1;
    this.startMouseY = -1;

    // store canvas w/o the selected image on it
    // this is needed for move and resize to work correctly
    const initialCanvas = get();
    this.image.delete(); // delete the moved image at initial position
    this.savedCanvas = get(); // save the state  of canvas before moving
    set(0, 0, initialCanvas);

    this.#markSelectedArea(this.image.selectedArea); // add selection visualization

    this.mode = "edit";
    // make copy, delete and cut buttons active
    this.#changeBtnState("copy", false);
    this.#changeBtnState("delete", false);
    this.#changeBtnState("cut", false);
    this.#changeBtnState("cancel", false);
  }

  #copyImage() {
    this.mode = "copy";
    this.#changeBtnState("copy", true);
    this.#changeBtnState("delete", true);
    this.#changeBtnState("cut", true);
    this.#changeBtnState("paste", false);
  }

  pasteImage() {
    // if canvas is clicked while in 'paste' mode
    updatePixels(); // clear the selection frame
    this.image.paste(); // paste the image
    loadPixels(); // save
    saveUndoSnapshot(); // make an undo snapshot
    this.#markSelectedArea(this.image.selectedArea);
  }

  #deleteImage() {
    updatePixels(); // clear the selection frame
    this.image.delete();
    loadPixels(); // save the new image
    saveUndoSnapshot(); // save a snapshot
    //reset to select mode
    this.#cancelSelection();
  }

  #cutImage() {
    updatePixels();
    this.image.delete();
    loadPixels();
    this.#changeBtnState("copy", true);
    this.#changeBtnState("delete", true);
    this.#changeBtnState("cut", true);
    this.#changeBtnState("paste", false);
  }

  #cancelSelection() {
    updatePixels();
    this.image = null;
    this.mode = "select";
    this.#changeBtnState("copy", true);
    this.#changeBtnState("delete", true);
    this.#changeBtnState("cut", true);
    this.#changeBtnState("paste", true);
    this.#changeBtnState("cancel", true);
  }

  #activatePaste() {
    // switches to paste mode
    this.mode = "paste";
    this.#changeBtnState("paste", true);
    this.#changeBtnState("cancel", false);
  }

  #addButton(name) {
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

  #changeBtnState(btn, disableValue) {
    //make buttons active/disabled
    const button = select(`#${btn}Btn`).elt;
    button.disabled = disableValue;
  }

  #displayResizeCursor(direction) {
    if (direction === "n" || direction === "s") {
      cursor("ns-resize");
    } else if (direction === "w" || direction === "e") {
      cursor("ew-resize");
    } else if (direction === "ne" || direction === "sw") {
      cursor("nesw-resize");
    } else if (direction === "nw" || direction === "se") {
      cursor("nwse-resize");
    }
  }


}
