class FreehandTool extends ToolItem {
  constructor(name){
    super(name);
  }
  

  //to smoothly draw we'll draw a line from the previous mouse location
  //to the current mouse location. The following values store
  //the locations from the last frame. They are -1 to start with because
  //we haven't started drawing yet.
  #previousMouseX = -1;
  #previousMouseY = -1;

  draw() {
    //if the mouse is pressed
    if (mouseIsPressed && mouseButton === LEFT) {
      //check if they previousX and Y are -1. set them to the current
      //mouse X and Y if they are.
      if (this.#previousMouseX == -1) {
        this.#previousMouseX = mouseX;
        this.#previousMouseY = mouseY;
      }
      //if we already have values for previousX and Y we can draw a line from
      //there to the current mouse location
      else {
        line(this.#previousMouseX, this.#previousMouseY, mouseX, mouseY);
        this.#previousMouseX = mouseX;
        this.#previousMouseY = mouseY;
      }
    }
    //if the mouse id released set the previousMouse values back to -1.
    else {
      if (this.#previousMouseX != -1) {
        this.#previousMouseX = -1;
        this.#previousMouseY = -1;
      }
    }
  };
}
