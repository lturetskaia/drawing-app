class ToolTip {
  constructor() {
    this.text = "Test";
    this.tooltip = select("#tooltip");
    this.hoverTimer = null; // timer for tooltip to appear
    this.timeout = 200; // timeout in ms
  }

  create() {
    const tooltipText = createP();
    this.tooltip.child(tooltipText);
    this.#setEventListeners();
  }

  #show(event) {
    // clear the previous timeout
    clearTimeout(this.hoverTimer);
    //the timer callback completes only if the mouse stops over the element
    // otherwise it is continuously reset
    this.hoverTimer = setTimeout(() => {

      let label;
      if (event.target.tagName === "IMG") {
        label = event.target.alt;
      } else {
        label = event.target.id;
        if (label.endsWith("Colour")) {
          //if the id has 'colour' at the end
          let labelArr = [...label];
          labelArr.splice(-6, 0, " ");
          label = labelArr.join("").toLowerCase();
        } else if (label.endsWith("Swatch")){
          //if the  id has "swatach" at the end
          label = label.slice(0, -6);
        }
      }

      // change tooltip position
      const xPos = event.x + 10;
      const yPos = event.y + 20;
      this.tooltip.style("left", `${xPos}px`);
      this.tooltip.style("top", `${yPos}px`);

      // change tooltip text
      const tooltipText = this.tooltip.elt.children[0];
      tooltipText.innerHTML = label;

      // show the tooltip
      this.tooltip.show();
    }, this.timeout);
  }

  #hide() {
    clearTimeout(this.hoverTimer);
    if (this.tooltip.class !== "hidden") {
      this.tooltip.hide();
    }
  }

  #setEventListeners() {
    const sidebar = select(".sidebar").elt;
    const menuBox = select(".menu").elt;
    const options = select(".options").elt;
    const imgBubble = [sidebar, menuBox, options];

    for (let i = 0; i < imgBubble.length; i++) {
      //event listener for moving mouse over an img item
      imgBubble[i].addEventListener("mousemove", (event) =>
        event.target.tagName === "IMG" ? this.#show(event) : null
      );

      //event listener for mouse leaving an img item
      imgBubble[i].addEventListener("mouseout", (event) =>
        event.target.tagName === "IMG" ? this.#hide() : null
      );
    }

    const coloursBubble = select(".colours").elt;

    coloursBubble.addEventListener("mousemove", (event) =>
      event.target.id ? this.#show(event) : null
    );

    // event listener for mouse leaving an img item
    coloursBubble.addEventListener("mouseout", (event) =>
      event.target.tagName === "DIV" ? this.#hide() : null
    );
  
  }
}
