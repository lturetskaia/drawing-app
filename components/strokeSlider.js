class StrokeSlider {
  constructor(min, max) {
    this.minValue = min;
    this.maxValue = max;
  }

  strokeWeight = 1;

  setStrokeWeight(value) {
    this.strokeWeight = value;
    strokeWeight(value);
    //change value on the label
    select("#strokeSliderLabel").html(value);
  }

  loadStrokeSlider() {
    //create slider div
    const container = createDiv();
    container.id("strokeSlider");

    //create slider
    const slider = createSlider(this.minValue, this.maxValue, this.strokeWeight);
    slider.id("strokeSliderInput");
    // slider.attribute('min', this.minValue);
    // slider.attribute('max', this.maxValue);

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
      this.setStrokeWeight(event.target.value)
    );
  }
}
