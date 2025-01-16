class RectangleTool extends ToolItem {
  constructor(name, icon) {
    super(name, icon);
  }

  // starting point of a rectangle
  // set to default value -1
  startMouseX = -1;
  startMouseY = -1;
  image;

  draw() {
    if (mouseIsPressed && mouseButton === LEFT) {
      console.log(pixels);
      if (this.startMouseX === -1) {
        // initialize the starting point of a rectangle
        this.startMouseX = mouseX;
        this.startMouseY = mouseY;
        loadPixels();
        this.image = get(); // save the state of the canvas
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
        image(this.image, 0, 0); 
        // draw the final version of the rectangle
        rect(
          this.startMouseX,
          this.startMouseY,
          mouseX - this.startMouseX,
          mouseY - this.startMouseY
        );

        this.startMouseX = -1;
        this.startMouseY = -1;
      }

    }
  }
}
