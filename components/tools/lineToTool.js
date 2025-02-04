function LineToTool() {
  this.icon = "assets/lineTo.jpg";
  this.name = "LineTo";
  this.label = 'Line';
  // default value of the starting point of a line
  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  this.draw = function () {
    if (mouseIsPressed && mouseButton === LEFT) {
      if (startMouseX == -1) {
        // initializes the starting point of the line to the current mouse position
        // and the drawing state to true
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;

        //save the state of pixels
        loadPixels();
      } else {
        // display the last saved state of pixels
        updatePixels();
        line(startMouseX, startMouseY, mouseX, mouseY);
      }
    } else if (drawing) {
      // when the mouse is released set drawing state to false
      // and the starting point to the default value -1
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  };
}
