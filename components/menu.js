class Menu {
  addMenuButton(name) {
    const newBtn = createButton('');
    newBtn.id(`${name}Button`);
    select(".menu").child(newBtn);
    const buttonImg = createImg(`assets/${name}.png`, name);
    buttonImg.parent(`${name}Button`);
  }

  clearCanvas() {
    //event handler for the clear button event. Clears the screen
    clear();
    background(255);

    //call loadPixels to update the drawing state
    //this is needed for the mirror tool
    loadPixels();
  }

  loadMenu() {
    this.addMenuButton("clear");
    this.addMenuButton("saveImage");
    select("#clearButton").mouseClicked(() => this.clearCanvas());

    //event handler for the save image button. saves the canvas to the
    //local file system.
    select("#saveImageButton").mouseClicked(() => saveCanvas("image", "jpg"));
  }
}
