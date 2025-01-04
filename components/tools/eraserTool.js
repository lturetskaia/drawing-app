class EraserTool {
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
  }

  
  selectedShape = "square"; // 'square' is a default shape

  draw() {
    // console.log(`The selected shape is a ${this.selectedShape}`)
    this.erase();
  }

  erase() {
    if (mouseIsPressed) {
      
      push();
      fill(255);
      noStroke();
      this.selectedShape === "square"
        ? rect(mouseX, mouseY, 5, 5)
        : ellipse(mouseX, mouseY, 5, 5);
      pop();
    }
  }

  populateOptions() {
    console.log("Populating options");

    //add shape select element
    this.addShapeSelect();
  }

  addShapeSelect() {
    // create a label for select element
    const dropdownLabel = createElement("label", "Shape: ");
    dropdownLabel.attribute("for", "dropdown");
    select(".options").child(dropdownLabel);

    // create a select element with 2 options
    const dropdown = createSelect();
    dropdown.id("dropdown");
    select(".options").child(dropdown);
    dropdown.option("square");
    dropdown.option("ellipse");
    dropdown.selected("square");

    //add dropdown event handler
    //change selectedShape to the selected value
    dropdown.changed(() => (this.selectedShape = dropdown.selected()));
  }

  unselectTool() {
    console.log("Unselect eraser");
    //clear options
    select(".options").html("");
  }
}
