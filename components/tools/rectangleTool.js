class RectangleTool extends ToolItem {
  constructor(name) {
    super(name);
  }

  // starting point of a rectangle
  // set to default value -1
  startMouseX = -1;
  startMouseY = -1;
  image;

  draw() {
    //check if mouse is in drawing position
    let mouseOverCanvas = mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseX < height;
    if (mouseIsPressed && mouseButton === LEFT && mouseOverCanvas) {
      if (this.startMouseX === -1) {
        // initialize the starting point of a rectangle
        this.startMouseX = mouseX;
        this.startMouseY = mouseY;
        loadPixels();
        // this.image = get(); // save the state of the canvas
        // save the state of pixels
      } else {
        // display the last saved state of pixels
        updatePixels();

        rect(
          this.startMouseX,
          this.startMouseY,
          mouseX - this.startMouseX,
          mouseY - this.startMouseY
        );
        // display size of the area
        push();
        fill(0);
        noStroke();
        textSize(14);
        text(
          `${mouseX - this.startMouseX} x ${mouseY - this.startMouseY}`,
          mouseX + 5,
          mouseY - 5
        );
        pop();
      }
    } else {
      if (this.startMouseX !== -1) {
        // when the drawing is done display the previous state before drawing
        // this is needed to erase the dimesions label
        updatePixels();
        // draw the final version of the rectangle
        rect(
          this.startMouseX,
          this.startMouseY,
          mouseX - this.startMouseX,
          mouseY - this.startMouseY
        );
        // save a new history snapshot
        saveUndoSnapshot();

        //reset the initial drawing point to default
        this.startMouseX = -1;
        this.startMouseY = -1;
      }

    }
  }
}
