//The BucketTool is based on an enhanced version
// of the basic 4-way floodfill pseudocode algorithm
// https://en.wikipedia.org/wiki/Flood_fill

class BucketTool extends ToolItem {
  constructor(name) {
    super(name);
  }

  #image;
  #newColour = [];
  #seedColour = [];

  draw(colour) {
    //check if click is on the canvas
    const pointIsValid =
      mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    if (pointIsValid) {
      const x = floor(mouseX);
      const y = floor(mouseY);
      // set new and old colour value
      this.#newColour = colour;
      this.#seedColour = get(x, y);

      //if the seed and new colour are the same, do nothing
      if (this.#newColour.toString() === this.#seedColour.toString()) {
        return;
      }

      //store current image
      this.#image = drawingContext.getImageData(0, 0, width, height);

      const start = new Date();
      this.#floodFill(x, y);
      const end = new Date();
      console.log(`Filling algorithms took ${end - start} ms`);
    }
  }

  #floodFill(initialX, initialY) {
    let currentPixel = {
      x: initialX,
      y: initialY,
      index: this.#getIndex(initialX, initialY),
    };

    //create a queue for finding and colouring neighbouring  pixels
    let queue = [];
    queue.push(currentPixel);

    const startLoad = new Date();

    while (queue.length > 0) {
      currentPixel = queue.pop();
      this.#colourPixel(currentPixel.index); // colour the pixel
      let neighbours = this.#findNeighbours(currentPixel); // find valid neighbours
      queue.push(...neighbours); // add valid neigbours to queue
    }
    const endLoad = new Date();
    console.log(`Filling algorithms took ${endLoad - startLoad} ms`);

    //load the new image to the canvas
    drawingContext.putImageData(this.#image, 0, 0);
  }

  #findNeighbours(currentPixel) {
    //find the neighbouring pixels of the current pixel (left,right, top, bottom)
    const possibleNeighbours = [
      {
        // left
        x: currentPixel.x - 1,
        y: currentPixel.y,
        index: currentPixel.index - 4,
      },
      {
        //right
        x: currentPixel.x + 1,
        y: currentPixel.y,
        index: currentPixel.index + 4,
      },
      {
        // top
        x: currentPixel.x,
        y: currentPixel.y - 1,
        index: currentPixel.index - width * 4,
      },
      {
        //bottom
        x: currentPixel.x,
        y: currentPixel.y + 1,
        index: currentPixel.index + width * 4,
      },
    ];

    const validNeighbours = [];

    //check if the neighbours are valid and fill validNeighbours array
    for (let i = 0; i < possibleNeighbours.length; i++) {
      if (this.#isValidPixel(possibleNeighbours[i])) {
        validNeighbours.push(possibleNeighbours[i]);
      }
    }
    return validNeighbours;
  }

  #colourPixel(index) {
    const imagePixels = this.#image.data; // access pixel array within image
    let pixelIndex = index; // starting point

    // find the four values of the pixel and change them to the corresponding new values
    for (let i = 0; i < 4; i++) {
      imagePixels[pixelIndex] = this.#newColour[i];
      pixelIndex++;
    }
  }

  #isValidPixel(pixel) {
    // check if the pixel is inside the canvas
    const isInsideCanvas =
      pixel.x >= 0 && pixel.x < width && pixel.y >= 0 && pixel.y < height;

    // check if the pixel is the same colour as the seed point
    let isSeedColour = true;
    if (isInsideCanvas) {
      let pixelIndex = pixel.index;
      for (let i = 0; i < 4; i++) {
        if (this.#image.data[pixelIndex] !== this.#seedColour[i]) {
          isSeedColour = false;
          break;
        }
        pixelIndex++;
      }
    }
    const pixelIsValid = isInsideCanvas && isSeedColour;
    return pixelIsValid;
  }

  #getIndex(x, y) {
    return (x + y * width) * 4;
  }
}
