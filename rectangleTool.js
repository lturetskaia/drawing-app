function RectangleTool() {
  this.name = "Reactangle";
  this.icon = "assets/rectangle.jpg";

  // starting point of a rectangle
  // set to default value -1
  var startMouseX = -1;
  var startMouseY = -1;
  var drawing = false;

  this.draw = function () {
    if (mouseIsPressed) {
      if (startMouseX === -1) {
        // initialize the starting point of a rectangle
        startMouseX = mouseX;
        startMouseY = mouseY;
        // save the state of pixels 
        loadPixels();
      } else {
        // display the last saved state of pixels
        updatePixels();
        fill(255);
        strokeWeight(1);
        rect(
          startMouseX,
          startMouseY,
          mouseX - startMouseX,
          mouseY - startMouseY
        );
        
      }
    } else {
      startMouseX = -1;
      startMouseY = -1;
      drawing = false;
    }
  };
}
