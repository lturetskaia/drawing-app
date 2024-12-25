class ClearCanvas extends MenuItem {
  constructor(name, icon, type) {
    super(name, icon, type);
  }
  // name = "clearCanvas";
  // icon = "/assets/clearCanvas.png";
  // type = 'btn';

  click() {
    //event handler for the clear button event. Clears the screen
    clear();
    background(255);

    //call loadPixels to update the drawing state
    //this is needed for the mirror tool
    loadPixels();
    
    // save a snapshot to history
    saveUndoSnapshot();
  }
}
