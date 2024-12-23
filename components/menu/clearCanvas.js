class ClearCanvas {
  name = "clearCanvas";
  icon = "/assets/clearCanvas.png";
  // isInput = false;
  type = 'btn';


  click() {
    //event handler for the clear button event. Clears the screen
    clear();
    background(255);

    //call loadPixels to update the drawing state
    //this is needed for the mirror tool
    loadPixels();
  }
}
