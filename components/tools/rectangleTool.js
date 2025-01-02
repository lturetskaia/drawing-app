class RectangleTool {
  constructor(name, icon){
    this.name = name
    this.icon = icon;
  }


  // starting point of a rectangle
  // set to default value -1
  startMouseX = -1;
  startMouseY = -1;

  draw() {
    if (mouseIsPressed) {
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
      }
    } else {
      this.startMouseX = -1;
      this.startMouseY = -1;
    }
  };
}
