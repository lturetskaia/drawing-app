//Displays and handles the colour palette.
function ColourPalette() {
  this.colours = [
    { name: "black", rgba: [0, 0, 0, 255] },
    { name: "white", rgba: [255, 255, 255, 255] },
    { name: "gray", rgba: [128, 128, 128, 255] },
    { name: "silver", rgba: [192, 192, 192, 255] },
    { name: "maroon", rgba: [128, 0, 0, 255] },
    { name: "red", rgba: [255, 0, 0, 255] },
    { name: "purple", rgba: [128, 0, 128, 255] },
    { name: "orange", rgba: [255, 165, 0, 255] },
    { name: "pink", rgba: [255, 192, 203, 255] },
    { name: "fuchsia", rgba: [255, 0, 255, 255] },
    { name: "green", rgba: [0, 128, 0, 255] },
    { name: "lime", rgba: [0, 255, 0, 255] },
    { name: "olive", rgba: [128, 128, 0, 255] },
    { name: "yellow", rgba: [255, 255, 0, 255] },
    { name: "navy", rgba: [0, 0, 128, 255] },
    { name: "blue", rgba: [0, 0, 255, 255] },
    { name: "teal", rgba: [0, 128, 128, 255] },
    { name: "aqua", rgba: [0, 255, 255, 255] },
  ];
  //mode 'fill' or 'stroke'
  this.mode = "stroke";

  //initial colours for fill and stroke
  // if the colour is a preset, presetName has a name - otherwise it's null
  this.selectedStrokeColour = {
    rgba: [0, 0, 0, 255],
    presetName: "black",
  };
  this.selectedFillColour = {
    rgba: [255, 255, 255, 255],
    presetName: "white",
  };

  this.opacity = 0;

  //create colour swatches for all preset colours
  const addColourSwatches = () => {
    //for each colour create a new div in the html for the colourSwatches
    for (let i = 0; i < this.colours.length; i++) {
      const colourID = this.colours[i].name + "Swatch";

      //using p5.dom add the swatch to the palette and set its background colour
      //to be the colour value.
      const colourSwatch = createDiv();
      colourSwatch.class("colourSwatches");
      colourSwatch.attribute('name', this.colours[i].name);
      colourSwatch.id(colourID);

      select(".colourPalette").child(colourSwatch);
      select("#" + colourID).style(
        "background-color",
        color(this.colours[i].rgba)
      );

      colourSwatch.mouseClicked(setColour);
    }
  };

  //create fill and stroke colour samples
  const addColourModeSamples = () => {
    //for stroke/fill samples create a new div
    //set the background colour to selectedStrokeColour or selectedFillColour
    const strokeColourSwatch = createDiv();
    strokeColourSwatch.id("strokeColour");

    select(".colourSamples").child(strokeColourSwatch);
    select("#strokeColour").style(
      "background-color",
      color(this.selectedStrokeColour.rgba)
    );
    select("#strokeColour").attribute('name', 'Stroke colour');

    const fillColourSwatch = createDiv();
    fillColourSwatch.id("fillColour");

    select(".colourSamples").child(fillColourSwatch);
    select("#fillColour").style(
      "background-color",
      color(this.selectedFillColour.rgba)
    );
    select("#fillColour").attribute('name', 'Fill colour');

    //add event listeners
    strokeColourSwatch.mouseClicked(colourModeClick);
    fillColourSwatch.mouseClicked(colourModeClick);
  };

  const setColour = (event) => {
    //remove border on colour swatches
    if (this.selectedFillColour.presetName !== null) {
      select("#" + this.selectedFillColour.presetName + "Swatch").removeClass(
        "active"
      );
    }

    if (this.selectedStrokeColour.presetName !== null) {
      select("#" + this.selectedStrokeColour.presetName + "Swatch").removeClass(
        "active"
      );
    }

    // get new colour value and P5.Color object
    const isColourInput = event.target.id === "colourInput";
    let newColourObject;
    let newColour;

    if (isColourInput) {
      newColourObject = color(event.target.value);
      newColour = { rgba: [...newColourObject.levels], presetName: null };
    } else {
      const colourName = event.target.id.split("Swatch")[0];
      const selectedColour = this.colours.filter(
        (colour) => colour.name === colourName
      );
      newColour = {
        rgba: [...selectedColour[0].rgba],
        presetName: selectedColour[0].name,
      };
      newColourObject = color(...newColour.rgba);
    }

    //set the selected colour to fill or stroke
    //and update the corresponding colour mode element
    if (this.mode === "stroke") {
      this.selectedStrokeColour = { ...newColour };
      select("#strokeColour").style("background-color", newColourObject);
      stroke(newColourObject);
      console.log(
        `Set stroke colour to rgba(${this.selectedStrokeColour.rgba})`
      );
    } else {
      this.selectedFillColour = { ...newColour };
      select("#fillColour").style("background-color", newColourObject);
      fill(newColourObject);
      console.log(`Set fill colour to rgba(${this.selectedFillColour.rgba})`);
    }

    isColourInput ? null : select(`#${event.target.id}`).addClass("active");
  };

  const colourModeClick = (event) => {
    //remove the old border from colourMode element
    select(`#${this.mode}Colour`).removeClass("active");

    //remove the old border on current swatch colour
    const isStrokePreset =
      this.mode === "stroke" && this.selectedStrokeColour.presetName !== null;
    const isFillPreset =
      this.mode === "fill" && this.selectedFillColour.presetName !== null;

    if (isStrokePreset) {
      select("#" + this.selectedStrokeColour.presetName + "Swatch").removeClass(
        "active"
      );
    } else if (isFillPreset) {
      select("#" + this.selectedFillColour.presetName + "Swatch").removeClass(
        "active"
      );
    }

    // set the selected mode to fill or stroke
    const newMode = event.target.id.split("Colour")[0];
    this.mode = newMode;

    //update the opcity input value
    updateOpacityInput();

    //add new border on active colour mode
    select(`#${this.mode}Colour`).addClass("active");

    // add new border on the colour swatch of the selected mode
    if (
      this.mode === "stroke" &&
      this.selectedStrokeColour.presetName !== null
    ) {
      select("#" + this.selectedStrokeColour.presetName + "Swatch").addClass(
        "active"
      );
    } else if (
      this.mode === "fill" &&
      this.selectedFillColour.presetName !== null
    ) {
      select("#" + this.selectedFillColour.presetName + "Swatch").addClass(
        "active"
      );
    }
  };

  const addRGBWheel = () => {
    //create an RGB button and a hidden colour input
    const RGBButton = createButton("");
    const colourInput = createInput("#000000", "color");
    colourInput.id("colourInput");

    RGBButton.parent("#editColour");
    RGBButton.attribute('id', 'changeColour');
    colourInput.parent("#editColour");

    // add event listeners
    RGBButton.mouseClicked(RGBButtonClick);
    colourInput.changed(setColour);
  };

  const RGBButtonClick = () => {
    //imitates a click on the hidden colour input element
    const colourInput = select("#colourInput").elt;
    colourInput.click();
  };

  const addOpacityInput = () => {
    //create opacity label and input
    const opacityInput = createInput("0", "number");
    opacityInput.id("opacity");
    opacityInput.attribute("min", 0);
    opacityInput.attribute("max", 100);

    const opacityLabel = createElement("label", "Opacity %");
    opacityLabel.attribute("for", "opacity");
    opacityLabel.parent("#opacityInput");
    opacityInput.parent("#opacityInput");
    opacityInput.attribute('name', 'Opacity');

    opacityInput.changed(setOpacity);
  };

  const setOpacity = (event) => {
    const opacityValue = +event.target.value;

    //check validity of user input and reset if invalid
    if (opacityValue > 100 || opacityValue < 0) {
      updateOpacityInput();
      return;
    }

    //map opacity %  values (0-100) to rbg alpha (0-255)
    const alphaValue = map(opacityValue, 0, 100, 255, 0).toFixed();

    //set opacity on stroke or fill
    if (this.mode === "fill") {
      this.selectedFillColour.rgba[3] = +alphaValue;
      fill(this.selectedFillColour.rgba);
      console.log(
        `Opacity set to ${+alphaValue}(${opacityValue}%) on current fill colour(${
          this.selectedFillColour.rgba
        })`
      );
    } 
    else {
      this.selectedStrokeColour.rgba[3] = +alphaValue;
      stroke(this.selectedStrokeColour.rgba);
      console.log(
        `Opacity set to ${+alphaValue}(${opacityValue}%) on current stroke colour(${
          this.selectedStrokeColour.rgba
        })`
      );
    }
  };

  const updateOpacityInput = () => {
    let opacityValue;
    if (this.mode === 'stroke'){
      const alphaValue = this.selectedStrokeColour.rgba[3];
      opacityValue = map(alphaValue, 0, 255, 100, 0).toFixed();
    } else {
      const alphaValue = this.selectedFillColour.rgba[3];
      opacityValue = map(alphaValue, 0, 255, 100, 0).toFixed();
    }
    //show current opacity value %
    select("#opacity").value(opacityValue);
  };

  //load in the colours
  this.loadColoursMenu = function () {
    //set the fill to white and stroke to black
    //at the start of the programme running
    fill(color(this.selectedFillColour.rgba));
    stroke(color(this.selectedStrokeColour.rgba));

    //create preset colour swatches, mode samples, rgb wheel, opacity input
    addColourSwatches();
    addColourModeSamples();
    addRGBWheel();
    addOpacityInput();

    select(".colourSwatches").addClass("active");
    select("#strokeColour").addClass("active");
  };
  //call the loadColours function now it is declared
  this.loadColoursMenu();
}
