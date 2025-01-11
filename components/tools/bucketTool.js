class BucketTool extends ToolItem {
  constructor(name, icon) {
    super(name, icon);
  }

  imagePixels;
  newColour = [];
  seedColour = [];

  draw(colour) {
    //check if click is on the canvas
    const pointIsValid =
      mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    if (pointIsValid) {
      const x = floor(mouseX);
      const y = floor(mouseY);
      // set new and old colour value
      this.newColour = colour;
      this.seedColour = get(x, y);

      //if the seed and new colours are tha same, do nothing
      if (this.newColour.toString() === this.seedColour.toString()) {
        return;
      }

      console.log(`// Old colour: ${this.seedColour} 
    // New colour: ${this.newColour} `);

      //store current image
      this.image = drawingContext.getImageData(0, 0, width, height);

      this.floodFill(x, y);
    }
  }

  floodFill(initialX, initialY) {
    let currentPixel = { x: initialX, y: initialY };
    // find index of the first pixel value (R)
    // let index = (currentPixel.x + currentPixel.y * width) * 4;
    let index = this.getIndex(currentPixel);
    // colour the pixel
    this.colourPixel(index);
    this.findNeighbours(currentPixel, index);

    //load the new image to the canvas
    drawingContext.putImageData(this.image, 0, 0);

    //create a queue for colouring pixels
  }

  findNeighbours(currentPixel, index) {
    //find the neighbouring pixels of the current pixel (left,right, top, bottom)
    const possibleNeighbours = [
      { x: currentPixel.x - 1, y: currentPixel.y }, // left
      { x: currentPixel.x + 1, y: currentPixel.y }, //right
      { x: currentPixel.x, y: currentPixel.y - 1 }, // top
      { x: currentPixel.x, y: currentPixel.y + 1 }, //bottom
    ];
    console.log(currentPixel, index, possibleNeighbours);

    const validNeighbours = [];

    //check if the neighbours are valid and fill validNeighbours array
    for (let i = 0; i < possibleNeighbours.length; i++) {
      if (this.isValidPixel(possibleNeighbours[i])) {
        validNeighbours.push(possibleNeighbours[i]);
      }
    }

    // console.log(validNeighbours);
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

  isValidPixel(pixel) {
    // check if the pixel is inside the canvas
    const isInsideCanvas =
      pixel.x >= 0 && pixel.x < width && pixel.y >= 0 && pixel.y < height;

    console.log(pixel);
    console.log(isInsideCanvas);

    // check if the pixel is the same colour as the seed point
    if (isInsideCanvas) {
      let isSeedColour = true;
      let pixelIndex = this.getIndex(pixel);
      for (let i = 0; i < 4; i++) {
        if (this.image.data[pixelIndex] !== this.seedColour[i]) {
          console.log(this.image.data[pixelIndex], this.seedColour[i]);
          isSeedColour = false;
          break;
        }
        pixelIndex++;
      }
      console.log(isSeedColour);
    }
  }

  getIndex(pixel) {
    return (pixel.x + pixel.y * width) * 4;
  }
}
