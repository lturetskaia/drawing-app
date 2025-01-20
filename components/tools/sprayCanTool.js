function SprayCanTool() {
  this.name = "sprayCanTool";
  this.icon = "assets/sprayCan.jpg";
  this.points = 40;
  this.spread = 10;
  this.draw = function () {
    //if the mouse is pressed paint on the canvas
    //spread describes how far to spread the paint from the mouse pointer
    //points holds how many pixels of paint for each mouse press.
    if (mouseIsPressed && mouseButton === LEFT) {
      for (let i = 0; i < this.points; i++) {
        push ();
        strokeWeight(1);
        point(
          random(mouseX - this.spread, mouseX + this.spread),
          random(mouseY - this.spread, mouseY + this.spread)
        );
        pop ();
      }
    }
  };
}
