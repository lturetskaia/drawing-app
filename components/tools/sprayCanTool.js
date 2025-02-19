function SprayCanTool() {
  this.name = "sprayCanTool";
  this.icon = "assets/sprayCan.jpg";
  this.label = "Spray";
  this.minMaxPoints = [5, 500];

  this.draw = function () {
    //if the mouse is pressed paint on the canvas
    //spread describes how far to spread the paint from the mouse pointer
    //points holds how many pixels of paint for each mouse press.
    if (mouseIsPressed && mouseButton === LEFT) {
      const spread = strokeSlider.brushStrokeWeight / 2;
      //map the number of points based on the stroke width
      const points = map(
        strokeSlider.brushStrokeWeight,
        1,
        100,
        this.minMaxPoints[0],
        this.minMaxPoints[1]
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
  };
}
