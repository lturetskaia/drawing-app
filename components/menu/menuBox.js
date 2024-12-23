class MenuBox {
  options = [];

  addOption(option) {
    console.log(option);
    if (!option.icon || !option.name || !option.type) {
      alert("Make sure your menu option has a name, an icon and a type!");
    }
    this.options.push(option);

    if (option.type === "input") {
      //when adding an input, add a hidden input and a button
      this.#addFileInput(option.name);
      this.#addMenuButton(option.name, option.icon);
      // button event handler opens the file input
      select(`#${option.name}Btn`).mouseClicked(() =>
        select(`#${option.name}Input`).elt.click()
      );
      //event handler for file picking
      select(`#${option.name}Input`).changed(() =>
        this.#selectOption(option.name)
      );
    } else if (option.type === "doubleBtn") {
      console.log('btn');
      this.#addMenuButton(option.name[0], option.icon);
      this.#addMenuButton(option.name[1], option.icon);
    } else {
      // when adding a button, add a button and click event handler
      this.#addMenuButton(option.name, option.icon);
      select(`#${option.name}Btn`).mouseClicked((event) =>
        this.#selectOption(event.target.id)
      );
    }
  }

  #addMenuButton(name, icon) {
    // create a button
    const newBtn = createButton("");
    newBtn.id(`${name}Btn`);
    select(".menu").child(newBtn);

    // add button icon
    const buttonImg = createImg(icon, name);
    buttonImg.id(name);
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
    this.options.filter((option) => option.name === optionName)[0].click();
  }
}
