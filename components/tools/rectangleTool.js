class RectangleTool extends ToolItem {
  constructor(name, icon) {
    super(name, icon);
  }

  // starting point of a rectangle
  // set to default value -1
  startMouseX = -1;
  startMouseY = -1;

  draw() {
    if (mouseIsPressed && mouseButton === LEFT) {
      if (this.startMouseX === -1) {
        // initialize the starting point of a rectangle
        this.startMouseX = mouseX;
        this.startMouseY = mouseY;
        // save the state of pixels
        loadPixels();
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
        // push();
        // fill(0);
        // noStroke();
        // textSize(14);
        // text(
        //   `${mouseX - this.startMouseX} x ${mouseY - this.startMouseY}`,
        //   mouseX + 5,
        //   mouseY - 5
        // );
        // pop();

      }
    } else {
      this.startMouseX = -1;
      this.startMouseY = -1;
    }
  }
}
