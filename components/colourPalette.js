//Displays and handles the colour palette.
function ColourPalette() {
  this.colours = [
    { name: "black", rgb: [0, 0, 0] },
    { name: "white", rgb: [255, 255, 255] },
    { name: "gray", rgb: [128, 128, 128] },
    { name: "silver", rgb: [192, 192, 192] },
    { name: "maroon", rgb: [128, 0, 0] },
    { name: "red", rgb: [255, 0, 0] },
    { name: "purple", rgb: [128, 0, 128] },
    { name: "orange", rgb: [255, 165, 0] },
    { name: "pink", rgb: [255, 192, 203] },
    { name: "fuchsia", rgb: [255, 0, 255] },
    { name: "green", rgb: [0, 128, 0] },
    { name: "lime", rgb: [0, 255, 0] },
    { name: "olive", rgb: [128, 128, 0] },
    { name: "yellow", rgb: [255, 255, 0] },
    { name: "navy", rgb: [0, 0, 128] },
    { name: "blue", rgb: [0, 0, 255] },
    { name: "teal", rgb: [0, 128, 128] },
    { name: "aqua", rgb: [0, 255, 255] },
  ];
  //mode 'fill' or 'stroke'
  this.mode = "stroke";

  //initial colours for fill and stroke
  this.selectedStrokeColour = {
    rgb: [0, 0, 0],
    presetName: "black",
  };
  this.selectedFillColour = {
    rgb: [255, 255, 255],
    presetName: "white",
  };
  this.opacity = 0;

  const changeColour = (event) => {
    //remove border on colour swatches
    if (this.selectedFillColour.presetName !== null) {
      select("#" + this.selectedFillColour.presetName + "Swatch").style(
        "border",
        "0"
      );
    }

    if (this.selectedStrokeColour.presetName !== null) {
      select("#" + this.selectedStrokeColour.presetName + "Swatch").style(
        "border",
        "0"
      );
    }

    // get new colour value and P5.Color object
    const isColourInput = event.target.id === "colourInput";
    let newColourObject;
    let newColour;

    if (isColourInput) {
      newColourObject = color(event.target.value);
      console.log(event.target.value);
      newColour = { rgb: [...newColourObject.levels], presetName: null };
    } else {
      const colourName = event.target.id.split("Swatch")[0];
      const selectedColour = this.colours.filter(
        (colour) => colour.name === colourName
      );
      newColour = {
        rgb: [...selectedColour[0].rgb],
        presetName: selectedColour[0].name,
      };
      newColourObject = color(...newColour.rgb);
    }

    //set the selected colour to fill or stroke
    //and update the corresponding colour mode element
    if (this.mode === "stroke") {
      this.selectedStrokeColour = { ...newColour };
      select("#strokeColour").style("background-color", newColourObject);
      stroke(newColourObject);
    } else {
      this.selectedFillColour = { ...newColour };
      select("#fillColour").style("background-color", newColourObject);
      fill(newColourObject);
    }

    isColourInput
      ? null
      : select(`#${event.target.id}`).style("border", "2px solid blue");
  };

  const colourModeClick = (event) => {
    //remove the old border from colourMode element
    select(`#${this.mode}Colour`).style("border", "0");

    //remove the old border on current swatch colour
    const isStrokeandString =
      this.mode === "stroke" && typeof this.selectedStrokeColour === "string";
    const isFillandString =
      this.mode === "fill" && typeof this.selectedFillColour === "string";

    if (isStrokeandString) {
      console.log(this.selectedStrokeColour);
      select("#" + this.selectedStrokeColour + "Swatch").style("border", "0");
    } else if (isFillandString) {
      select("#" + this.selectedFillColour + "Swatch").style("border", "0");
    }

    // set the selected mode to fill or stroke
    const newMode = event.target.id.split("Colour")[0];
    this.mode = newMode;

    //add new border on active colour mode
    select(`#${this.mode}Colour`).style("border", "2px solid blue");

    // add new border on the colour swatch of the selected mode
    if (isStrokeandString) {
      select("#" + this.selectedStrokeColour + "Swatch").style(
        "border",
        "2px solid blue"
      );
    } else if (isFillandString) {
      select("#" + this.selectedFillColour + "Swatch").style(
        "border",
        "2px solid blue"
      );
    }
  };

  //create colour swatches for all preset colours
  const addColourSwatches = () => {
    //for each colour create a new div in the html for the colourSwatches
    for (let i = 0; i < this.colours.length; i++) {
      const colourID = this.colours[i].name + "Swatch";
      const colourObject = color(this.colours[i].rgb);
      console.log(colourObject);

      //using p5.dom add the swatch to the palette and set its background colour
      //to be the colour value.
      const colourSwatch = createDiv();
      colourSwatch.class("colourSwatches");
      colourSwatch.id(colourID);

      select(".colourPalette").child(colourSwatch);
      select("#" + colourID).style(
        "background-color",
        color(this.colours[i].rgb)
      );
      colourSwatch.mouseClicked(changeColour);
    }
  };

  //create samples of fill and stroke colour
  const addColourSamples = () => {
    //for stroke/fill samples create a new div
    //set the background colour to selectedStrokeColour or selectedFillColour
    const strokeColourSwatch = createDiv();
    strokeColourSwatch.id("strokeColour");

    select(".colourSamples").child(strokeColourSwatch);
    select("#strokeColour").style(
      "background-color",
      color(this.selectedStrokeColour.rgb)
    );
    strokeColourSwatch.mouseClicked(colourModeClick);

    const fillColourSwatch = createDiv();
    fillColourSwatch.id("fillColour");

    select(".colourSamples").child(fillColourSwatch);
    select("#fillColour").style(
      "background-color",
      color(this.selectedFillColour.rgb)
    );
    fillColourSwatch.mouseClicked(colourModeClick);
  };

  const addRGBWheel = () => {
    //create an RGB button and a hidden colour input
    const RGBButton = createButton("");
    const colourInput = createInput("#000000", "color");
    colourInput.id("colourInput");

    RGBButton.parent("#colourWheel");
    colourInput.parent("#colourWheel");

    RGBButton.mouseClicked(RGBButtonClick);
    colourInput.changed(changeColour);
  };

  const RGBButtonClick = (event) => {
    //imitates a click on the hidden colour input element

    const colourInput = select("#colourInput").elt;
    colourInput.click();
  };

  const addOpacityInput = () => {
    //create opacity label and input
    const opacityInput = createInput("0", "number");
    opacityInput.id("opacity");
    opacityInput.attribute("min", "0");
    opacityInput.attribute("max", "100");

    const opacityLabel = createElement("label", "Opacity %");
    opacityLabel.attribute("for", "opacity");
    opacityLabel.parent("#opacityInput");
    opacityInput.parent("#opacityInput");

    opacityInput.changed(changeOpacity);
  };

  const changeOpacity = (event) => {
    const opacityValue = +event.target.value;

    //check validity of user input
    if (opacityValue > 255 || opacityValue < 0) {
      return;
    }

    //map opacity %  values (0-100) to rbg alpha (0-255)
    const alpha = map(opacityValue, 0, 100, 255, 0).toFixed();
    console.log(opacityValue, alpha);


    if (this.mode === "stroke") {
      this.selectedStrokeColour.rgb[3] = +opacityValue;
      stroke(this.selectedStrokeColour.rgb);
    } else {
      this.selectedFillColour.rgb[3] = +opacityValue;
      fill(this.selectedFillColour.rgb);
    }
  };

  //load in the colours
  this.loadColours = function () {
    //set the fill to white and stroke to black
    //at the start of the programme running
    fill(color(this.selectedFillColour.rgb));
    stroke(color(this.selectedStrokeColour.rgb));

    //create preset colour swatches, mode samples, rgb wheel, opacity input
    addColourSwatches();
    addColourSamples();
    addRGBWheel();
    addOpacityInput();

    select(".colourSwatches").style("border", "2px solid blue");
    select("#strokeColour").style("border", "2px solid blue");
  };
  //call the loadColours function now it is declared
  this.loadColours();
}
