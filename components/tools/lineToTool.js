class LineToTool extends ToolItem {
  constructor(name, label){
    super(name, label);
  }
  // default value of the starting point of a line
  #startMouseX = -1;
  #startMouseY = -1;
  #isDrawing = false;

  draw() {
    if (mouseIsPressed && mouseButton === LEFT) {
      if (this.#startMouseX == -1) {
        // initializes the starting point of the line to the current mouse position
        // and the drawing state to true
        this.#startMouseX = mouseX;
        this.#startMouseY = mouseY;
        this.#isDrawing  = true;

        //save the state of pixels
        loadPixels();
      } else {
        // display the last saved state of pixels
        updatePixels();
        line(this.#startMouseX, this.#startMouseY, mouseX, mouseY);
      }
    } else if (this.#isDrawing ) {
      // when the mouse is released set drawing state to false
      // and the starting point to the default value -1
      this.#isDrawing  = false;
      this.#startMouseX = -1;
      this.#startMouseY = -1;
    }
  };
}
