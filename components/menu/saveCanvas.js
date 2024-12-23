class SaveCanvas {
  name = "saveCanvas";
  icon = "/assets/saveCanvas.png";
  // isInput = false;
  type = 'btn';

  click() {
    saveCanvas("image", "jpg");
  }
}
