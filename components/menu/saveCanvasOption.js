class SaveCanvasOption {
  name = "saveCanvas";
  icon = "/assets/saveCanvas.png";
  isInput = false;

  click() {
    saveCanvas("image", "jpg");
  }
}
