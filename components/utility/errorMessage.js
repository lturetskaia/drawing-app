class ErrorMessage {
  constructor(title, message, x, y) {
    this.title = title;
    this.message = message;
    this.xPos = x;
    this.yPos = y;
  }

  show() {
    this.#createMessage();

    //after 3 seconds remove the error message from the dom
    setTimeout(() => {
      select("#errorBox").remove();
    }, 3000);
  }

  #createMessage() {
    //create a div with a paragraph containing a message
    const errorBox = createDiv();
    errorBox.id("errorBox");
    const errorMsg = createP(this.message);
    errorBox.child(errorMsg);
    errorBox.style("display", "block");
    
    //set the position
    errorBox.style("left", `${this.xPos}px`);
    errorBox.style("top", `${this.yPos + 25}px`);

    const wrapper = select(".wrapper");
    wrapper.child(errorBox);
  }
}
