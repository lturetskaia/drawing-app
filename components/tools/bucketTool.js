//The BucketTool is based on an enhanced version
// of the span flood fill algorithm
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

      this.#floodFill(x, y);
      
    }
  }

  #floodFill(x, y) {
    //stack of valid pixels
    const pixelStack = [[x, y]];

    while (pixelStack.length > 0) {
      const [currX, currY] = pixelStack.pop();
      let leftX = currX; // left edge of the row

      //find the leftmost point of the row
      while (leftX > 0 && this.#isSeedColour(leftX, currY)) {
        leftX--;
      }

      let rightX = currX;

      //find the leftmost point of the row
      while (rightX < width && this.#isSeedColour(rightX, currY)) {
        rightX++;
      }

      //colour the found span
      this.#colourSpan(leftX, rightX, currY);

      for (let deltaY of [-1, 1]) {
        const nextY = currY + deltaY;

        if (nextY < 0 || nextY >= height) {
          continue;
        }

        let i = leftX; // this is the current leftmost point of the upper/lower row
        while (i <= rightX) { //scan from the leftmost point to the rightmost point
          let spanFound = false;

          while (i <= rightX && this.#isSeedColour(i, nextY)) {
            if (!spanFound) {
              pixelStack.push([i, nextY]);
              spanFound = true;
            }
            i++;
          }
          i++;
        }
      }
    }

    //load the new image to the canvas
    drawingContext.putImageData(this.#image, 0, 0);
  }

  #colourSpan(leftX, rightX, y) {
    // const imagePixels = this.#image.data; // access pixel array within image
    let pixelIndex = this.#getIndex(leftX, y); // starting point
    const spanLength = 4 * (rightX - leftX);
    // find the four values of the pixel and change them to the corresponding new values
    for (let i = 0; i < spanLength; i++) {
      this.#image.data[pixelIndex] = this.#newColour[i % 4];
      pixelIndex++;
    }
  }

  #isSeedColour(x, y) {
    let pixelIndex = this.#getIndex(x, y);
    // check if the pixel is the same colour as the seed point
    let isSeedColour = true;
    for (let i = 0; i < 4; i++) {
      if (this.#image.data[pixelIndex] !== this.#seedColour[i]) {
        isSeedColour = false;
        break;
      }
      pixelIndex++;
    }

    return isSeedColour;
  }

  #getIndex(x, y) {
    return (x + y * width) * 4;
  }
}
