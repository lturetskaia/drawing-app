class SprayCanTool extends ToolItem {
  constructor(name) {
    super(name);
  }

  #minMaxPoints = [5, 500];
  
  draw() {
    //if the mouse is pressed paint on the canvas
    //spread describes how far to spread the paint from the mouse pointer
    //points holds how many pixels of paint for each mouse press.
    if (mouseIsPressed && mouseButton === LEFT) {
      const brushWeight = strokeSlider.getBrushWeight();
      const spread = brushWeight / 2;
      //map the number of points based on the stroke width
      const points = map(
        brushWeight,
        1,
        100,
        this.#minMaxPoints[0],
        this.#minMaxPoints[1]
      ).toFixed();
      for (let i = 0; i < points; i++) {
        push();
        strokeWeight(1);
        point(
          random(mouseX - spread, mouseX + spread),
          random(mouseY - spread, mouseY + spread)
        );
        pop();
      }
    }
  }
}
