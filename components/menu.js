class Menu {
  #addMenuButton(name) {
    const newBtn = createButton("");
    newBtn.id(`${name}Button`);
    select(".menu").child(newBtn);
    const buttonImg = createImg(`assets/${name}.png`, name);
    buttonImg.parent(`${name}Button`);
  }

  #addFileInput() {
    //create hidden file input
    const fileInput = createInput("");
    fileInput.attribute("type", "file");
    fileInput.attribute("accept", "image/png, image/jpeg");
    fileInput.id("fileInput");
    select(".menu").child(fileInput);

    //create uploadButton
    this.#addMenuButton("upload");
  }

  uploadImage() {
    const imageFile = select("#fileInput").elt.files[0];
    // prevent image loading if the user cancels without picking a file
    if (!imageFile) {
      return;
    }
    let img;
    // read the target image datawith FileReader
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    // when finished data reading, load the image and add it to canvas
    fileReader.onloadend = function () {
      console.log(fileReader.result);
      img = loadImage(fileReader.result, () => image(img, 10, 10));
    };
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
    this.#addMenuButton("saveImage");
    this.#addFileInput();
    this.#addMenuButton("clear");
    select("#clearButton").mouseClicked(() => this.clearCanvas());

    //event handler for the save image button. Saves the canvas to the
    //local file system.
    select("#saveImageButton").mouseClicked(() => saveCanvas("image", "jpg"));
    //event handler for the upload image image button. Opens file input
    select("#uploadButton").mouseClicked(() =>
      select("#fileInput").elt.click()
    );
    select("#fileInput").changed(() => this.uploadImage());
  }
}
