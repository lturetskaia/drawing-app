class MirrorDrawTool extends ToolItem {
  constructor(name) {
    super(name);
    this.label = "Mirror";
  }

  // detects the drawing state
  // needed for undo to work correctly without saving the axis
  #isDrawing = false;

  //which axis is being mirrored (x or y) x is default
  #axis = "x";
  //line of symmetry is halfway across the screen
  #lineOfSymmetry = width / 2;

  //where was the mouse on the last time draw was called.
  //set it to -1 to begin with
  #previousMouseX = -1;
  #previousMouseY = -1;

  //mouse coordinates for the other side of the Line of symmetry.
  #previousOppositeMouseX = -1;
  #previousOppositeMouseY = -1;

  draw() {
    //display the last save state of pixels
    updatePixels();

    //do the drawing if the mouse is pressed
    if (mouseIsPressed && mouseButton === LEFT) {
      //if the previous values are -1 set them to the current mouse location
      //and mirrored positions
      if (this.#previousMouseX == -1) {
        this.#previousMouseX = mouseX;
        this.#previousMouseY = mouseY;
        this.#previousOppositeMouseX = this.#calculateOpposite(mouseX, "x");
        this.#previousOppositeMouseY = this.#calculateOpposite(mouseY, "y");

        this.#isDrawing = true;
      }

      //if there are values in the previous locations
      //draw a line between them and the current positions
      else {
        line(this.#previousMouseX, this.#previousMouseY, mouseX, mouseY);
        this.#previousMouseX = mouseX;
        this.#previousMouseY = mouseY;

        //these are for the mirrored drawing the other side of the
        //line of symmetry
        const oX = this.#calculateOpposite(mouseX, "x");
        const oY = this.#calculateOpposite(mouseY, "y");
        line(
          this.#previousOppositeMouseX,
          this.#previousOppositeMouseY,
          oX,
          oY
        );
        this.#previousOppositeMouseX = oX;
        this.#previousOppositeMouseY = oY;
      }
    }
    //if the mouse isn't pressed reset the previous values to -1
    else {
      const mouseOverCanvas =
        mouseX >= 0 && mouseY <= width && mouseY >= 0 && mouseY <= height;
      if (this.#isDrawing === true && mouseOverCanvas) {
        // when the mouseButton is released after drawing
        // save an undo snapshot and reset isDrawing to false
        saveUndoSnapshot();
        this.#isDrawing = false;
      }
      this.#previousMouseX = -1;
      this.#previousMouseY = -1;

      this.#previousOppositeMouseX = -1;
      this.#previousOppositeMouseY = -1;
    }

    //after the drawing is done save the pixel state. We don't want the
    //line of symmetry to be part of our drawing

    loadPixels();

    //push the drawing state so that we can set the stroke weight and colour
    push();
    strokeWeight(3);
    stroke("red");
    //draw the line of symmetry
    if (this.#axis == "x") {
      line(width / 2, 0, width / 2, height);
    } else {
      line(0, height / 2, width, height / 2);
    }
    //return to the original stroke
    pop();
  }

  /*calculate an opposite coordinate the other side of the
   *symmetry line.
   *@param n number: location for either x or y coordinate
   *@param a [x,y]: the axis of the coordinate (y or y)
   *@return number: the opposite coordinate
   */
  #calculateOpposite(n, a) {
    //if the axis isn't the one being mirrored return the same
    //value
    if (a != this.#axis) {
      return n;
    }

    //if n is less than the line of symmetry return a coorindate
    //that is far greater than the line of symmetry by the distance from
    //n to that line.
    if (n < this.#lineOfSymmetry) {
      return this.#lineOfSymmetry + (this.#lineOfSymmetry - n);
    }

    //otherwise a coordinate that is smaller than the line of symmetry
    //by the distance between it and n.
    else {
      return this.#lineOfSymmetry - (n - this.#lineOfSymmetry);
    }
  }

  //when the tool is deselected update the pixels to just show the drawing and
  //hide the line of symmetry. Also clear options
  unselectTool() {
    updatePixels();
    //clear options
    select(".options").html("");
  }

  //adds a button and click handler to the options area. When clicked
  //toggle the line of symmetry between horizonatl to vertical
  populateOptions() {
    select(".options").html(
      "<button id='directionButton'>Make Horizontal</button>"
    );
    // click handler
    select("#directionButton").mouseClicked((event) => {
      const button = select("#" + event.elt.id);
      if (this.#axis == "x") {
        this.#axis = "y";
        this.#lineOfSymmetry = height / 2;
        button.html("Make Vertical");
      } else {
        this.#axis = "x";
        this.#lineOfSymmetry = width / 2;
        button.html("Make Horizontal");
      }
    });
  }
}
