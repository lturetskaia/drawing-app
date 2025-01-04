class CustomSlider {
    
  static create(name,min, max, targetElement) {
    //create slider div
    const container = createDiv();
    container.id(`${name}Slider`);

    //create slider
    const slider = createSlider(1, 50, 1);
    slider.id(`${name}SizeSlider"`);

    //create slider label
    const label = createElement("p", "1");
    label.id(`${name}SizeLabel`);

    console.log("Slaider!");

    //add slider to the parent element
    const sidebar = select(".options");
    container.parent(sidebar);
    slider.parent(container);
    label.parent(container);
  }
}
