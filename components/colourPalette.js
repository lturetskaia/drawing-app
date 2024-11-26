//Displays and handles the colour palette.
function ColourPalette() {
  //a list of web colour strings
  this.colours = [
    "black",
    "white",
    "gray",
    "silver",
    "maroon",
    "red",
    "purple",
    "orange",
    "pink",
    "fuchsia",
    "green",
    "lime",
    "olive",
    "yellow",
    "navy",
    "blue",
    "teal",
    "aqua",
  ];
  //mode 'fill' or 'stroke'
  this.mode = "stroke";

  //initial colours for fill and stroke
  this.selectedStrokeColour = "black";
  this.selectedFillColour = "white";

  const colourSwatchClick = (event) => {
    //remove border on colour swatches
    select("#" + this.selectedStrokeColour + "Swatch").style("border", "0");
    select("#" + this.selectedFillColour + "Swatch").style("border", "0");

    //get the new colour from the id of the clicked element
    console.log(event.target.id);
    const newColour = event.target.id.split("Swatch")[0];

    //set the selected colour to fill or stroke
    //and update the corresponding colour mode element
    if (this.mode === "stroke") {
      this.selectedStrokeColour = newColour;
      select("#strokeColour").style("background-color", newColour);
      stroke(newColour);
    } else {
      this.selectedFillColour = newColour;
      select("#fillColour").style("background-color", newColour);
      fill(newColour);
    }

    //add a new border to the selected colour
    select(`#${event.target.id}`).style("border", "2px solid blue");
  };

  const colourModeClick = (event) => {
    //remove the old border from colourMode element
    select(`#${this.mode}Colour`).style("border", "0");

    //remove the old border on current swatch colour
    if (this.mode === "stroke") {
      select("#" + this.selectedStrokeColour + "Swatch").style("border", "0");
    } else {
      select("#" + this.selectedFillColour + "Swatch").style("border", "0");
    }

    // set the selected mode to fill or stroke
    const newMode = event.target.id.split("Colour")[0];
    this.mode = newMode;

    //add new border on active colour mode
    select(`#${this.mode}Colour`).style("border", "2px solid blue");

    // add new border on the colour swatch of the selected mode
    if (this.mode === "stroke") {
      select("#" + this.selectedStrokeColour + "Swatch").style(
        "border",
        "2px solid blue"
      );
    } else {
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
      const colourID = this.colours[i] + "Swatch";

      //using p5.dom add the swatch to the palette and set its background colour
      //to be the colour value.
      const colourSwatch = createDiv();
      colourSwatch.class("colourSwatches");
      colourSwatch.id(colourID);

      select(".colourPalette").child(colourSwatch);
      select("#" + colourID).style("background-color", this.colours[i]);
      colourSwatch.mouseClicked(colourSwatchClick);
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
      this.selectedStrokeColour
    );
    strokeColourSwatch.mouseClicked(colourModeClick);

    const fillColourSwatch = createDiv();
    fillColourSwatch.id("fillColour");

    select(".colourSamples").child(fillColourSwatch);
    select("#fillColour").style("background-color", this.selectedFillColour);
    fillColourSwatch.mouseClicked(colourModeClick);
  };

  //load in the colours
  this.loadColours = function () {
    //set the fill to white and stroke to black
    //at the start of the programme running
    fill(this.colours[1]);
    stroke(this.colours[0]);

    //create preset colour swatches
    addColourSwatches();
    addColourSamples();

    select(".colourSwatches").style("border", "2px solid blue");
    select("#strokeColour").style("border", "2px solid blue");
  };
  //call the loadColours function now it is declared
  this.loadColours();
}
