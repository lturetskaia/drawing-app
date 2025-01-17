class EditImageTool extends ToolItem {
  constructor(name) {
    super(name);
  }

  draw(){
    // cursor(CROSS);

  }

  populateOptions(){
    console.log('populating options');
    this.addButton('copy');
    this.addButton('delete');
    this.addButton('cut');
    this.addButton('paste');


  }
   addButton(name){
    const icon = `assets/${name}.jpg`;
    const newBtn = createButton("");
    newBtn.id(`${name}Btn`);
    select(".options").child(newBtn);

    // add button icon
    const buttonImg = createImg(icon, name);
    buttonImg.id(`${name}Img`);
    buttonImg.parent(`${name}Btn`);
   }

  unselectTool(){
    console.log("Unselect edit image");
    //clear options
    select(".options").html("");

  }
}
