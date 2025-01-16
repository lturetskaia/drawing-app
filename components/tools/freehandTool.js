function FreehandTool() {
  //set an icon and a name for the object
  this.icon = "assets/freehand.jpg";
  this.name = "freehand";

  //to smoothly draw we'll draw a line from the previous mouse location
  //to the current mouse location. The following values store
  //the locations from the last frame. They are -1 to start with because
  //we haven't started drawing yet.
  let previousMouseX = -1;
  let previousMouseY = -1;

  this.draw = function () {
    //if the mouse is pressed
    if (mouseIsPressed && mouseButton === LEFT) {
      //check if they previousX and Y are -1. set them to the current
      //mouse X and Y if they are.
      if (previousMouseX == -1) {
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
      //if we already have values for previousX and Y we can draw a line from
      //there to the current mouse location
      else {
        line(previousMouseX, previousMouseY, mouseX, mouseY);
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
    }
    //if the mouse id released set the previousMouse values back to -1.
    else {
      if (previousMouseX != -1) {
        previousMouseX = -1;
        previousMouseY = -1;
        console.log("log");
      }
    }
  };
}
