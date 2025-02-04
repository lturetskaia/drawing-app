//container class for menu options
class MenuBox {
  options = [];

  addOption(option) {
    if (!option.icon || !option.name || !option.type) {
      alert("Make sure your menu option has a name, an icon and a type!");
    }
    this.options.push(option);

    if (option.type === "input") {
      //when adding an input, add a hidden input and a button
      this.#addFileInput(option.name);
      this.#addMenuButton(option.name, option.icon, option.label);
      // button event handler opens the file input
      select(`#${option.name}Btn`).mouseClicked(() =>
        select(`#${option.name}Input`).elt.click()
      );
      //event handler for file picking
      select(`#${option.name}Input`).changed(() =>
        this.#selectOption(option.name)
      );
    } else if (option.type === "doubleBtn") {
      // when adding a undo/redo button, add 2 buttons and click event handlers
      // buttons are disabled by default
      this.#addMenuButton(option.name[0], option.icon, option.label[0]);
      this.#addMenuButton(option.name[1], option.icon, option.label[1]);

      const undoBtn = select(`#${option.name[0]}Btn`);
      undoBtn.mouseClicked((event) =>
        this.#selectOption(event.target.id)
      );
      undoBtn.attribute('disabled', 'true');

      const redoBtn = select(`#${option.name[1]}Btn`);

      redoBtn.mouseClicked((event) =>
        this.#selectOption(event.target.id)
      );
      redoBtn.attribute('disabled', 'true');
    } else {
      // when adding a button, add a button and click event handler
      this.#addMenuButton(option.name, option.icon, option.label);
      select(`#${option.name}Btn`).mouseClicked((event) =>
        this.#selectOption(event.target.id)
      );
    }
  }

  #addMenuButton(name, icon, label) {
    // create a button
    const newBtn = createButton("");
    newBtn.id(`${name}Btn`);
    select(".menu").child(newBtn);

    // add button icon
    const buttonImg = createImg(icon, name);
    buttonImg.id(name);
    buttonImg.attribute('alt', `${label}`);
    buttonImg.parent(`${name}Btn`);
  }

  #addFileInput(name) {
    //create hidden file input
    const fileInput = createInput("");
    fileInput.attribute("type", "file");
    fileInput.attribute("accept", "image/png, image/jpeg");
    fileInput.id(`${name}Input`);
    select(".menu").child(fileInput);
  }

  #selectOption(optionName) {
    if (optionName === 'redo' || optionName === 'undo'){
      this.options.filter((option) => option.name[0] === "undo")[0].click(optionName);
    } else {
      this.options.filter((option) => option.name === optionName)[0].click();
    }
    
  }
}
