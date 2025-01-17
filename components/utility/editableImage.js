class EditableImage {
  constructor(x, y, image) {
    this.selectedArea = {
      x: x,
      y: y,
      width: mouseX - x,
      height: mouseY - y,
    };

    this.image = get(x, y, this.selectedArea.width, this.selectedArea.height);
  }
}
