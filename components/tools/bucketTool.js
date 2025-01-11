class BucketTool extends ToolItem {
  constructor(name, icon) {
    super(name, icon);
  }

  imagePixels;
  newColour = [];
  oldColour = [];

  draw(colour) {
    // set new and old colour value
    this.newColour = colour;
    this.oldColour = get(mouseX, mouseY);
    console.log(`// Old colour: ${this.oldColour} 
    // New colour: ${this.newColour} `);

    //store current image
    this.image = drawingContext.getImageData(0, 0, width, height);

    this.floodFill(mouseX, mouseY);
  }

  floodFill(initialX, initialY) {
    let currentPixel = { x: initialX, y: initialY };
    // find index of the first pixel value (R)
    let index = (currentPixel.x + currentPixel.y * width) * 4;
    // colour the pixel
    this.colourPixel(index);

    //load the new image to the canvas
    drawingContext.putImageData(this.image, 0, 0);

    //create a queue for colouring pixels
  }

  findNeighbours(){
    //find the neighbouring pixels of the current pixel (left, top, right, bottom)

  }

  colourPixel(index) {
    const imagePixels = this.image.data; // access pixel array within image
    let pixelIndex = index; // starting point

    // find the four values of the pixel and change them to the corresponding new values
    for (let i = 0; i < 4; i++) {
      imagePixels[pixelIndex] = this.newColour[i];
      pixelIndex++;
    }
  }
 isValidPixel(){
  // check if pixel is inside the canvas and has old colour

 }

}
