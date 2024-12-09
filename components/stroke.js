class Stroke {
    strokeWeight = 1;

  setStrokeWeight(value) {
    strokeWeight(value);
    this.strokeWeight = value;
    //chnage value on the label
    select("#strokeLabel").html(value);
  }

  loadStrokeSlider() {
    //create slider div
    const container = createDiv();
    container.id("slider");

    //create slider
    const slider = createSlider(1, 50, this.strokeWeight);
    slider.id("strokeSlider");

    //create sslider label
    const label = createElement("p", "1");
    label.id("strokeLabel");

    //add slider to the sidebar
    const sidebar = select(".sidebar");
    container.parent(sidebar);
    slider.parent(container);
    label.parent(container);

    //slider event handler
    select("#strokeSlider").changed((event) =>
      this.setStrokeWeight(event.target.value)
    );
  }
}
