class StrokeSlider {
  constructor(min, max) {
    this.minValue = min;
    this.maxValue = max;
  }
  selectedMode = "brush"; // 'brush' or 'eraser'
  eraserStrokeWeight = 20;
  brushStrokeWeight = 1;

  setStrokeWeight(value, event) {
    //check for invalid input
    if (value < 0 || value > 100) {
      console.log('Error');
      // create an error message
      const x = event.target.offsetLeft;
      const y = event.target.offsetTop;
      const error = new ErrorMessage(
        "Stroke Weight Error",
        "Please enter a value between 0 and 100.",
        x,
        y
      );
      error.show();
      return;
    }
    // set stroke weight for earser or brush
    if (this.selectedMode === "eraser") {
      this.eraserStrokeWeight = Number(value);
      strokeWeight(value);
    } else {
      this.brushStrokeWeight = Number(value);
      strokeWeight(value);
    }
    //change value on the label
    select("#strokeSliderLabel").html(value);
  }

  getEraserWeight() {
    return Number(this.eraserStrokeWeight);
  }

  changeMode(mode) {
    //changes between slider modes and corresponding values
    this.selectedMode = mode;
    console.log(strokeSlider.brushStrokeWeight);
    const strokeValue =
      this.selectedMode === "brush"
        ? this.brushStrokeWeight
        : this.eraserStrokeWeight;
    select("#strokeSliderInput").value(strokeValue);
    select("#strokeSliderLabel").html(strokeValue);
    strokeWeight(strokeValue);
  }

  loadStrokeSlider() {
    //create slider div
    const container = createDiv();
    container.id("strokeSlider");

    //create slider
    const slider = createSlider(
      this.minValue,
      this.maxValue,
      this.brushStrokeWeight
    );
    slider.id("strokeSliderInput");
    slider.attribute("title", "Stroke width");

    //create slider label
    const label = createElement("p", "1");
    label.id("strokeSliderLabel");

    //add slider to the sidebar
    const sidebar = select(".sidebar");
    container.parent(sidebar);
    slider.parent(container);
    label.parent(container);

    //slider event handler
    select("#strokeSliderInput").input((event) =>
      this.setStrokeWeight(event.target.value, event)
    );
  }
}
