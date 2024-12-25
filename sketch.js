//global variables that will store the toolbox colour palette
//amnd the helper functions

let toolbox;
let menu;

function setup() {
  //create a canvas to fill the content div from index.html

  const canvasContainer = select("#content");
  const canvas = createCanvas(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  background(255);
  canvas.parent("content");
  canvas.mouseReleased(() =>
    toolbox.selectedTool.name !== "mirrorDraw" ? saveUndoSnapshot() : null
  );

  
  //create the colour palette
  const colourPalette = new ColourPalette();
  
  // create menu and add menu options
  menu = new MenuBox();
  menu.addOption(new SaveCanvas("saveCanvas", "/assets/saveCanvas.png", "btn"));
  menu.addOption(
    new ClearCanvas("clearCanvas", "/assets/clearCanvas.png", "btn")
  );
  menu.addOption(
    new ImageUpload("imageUpload", "/assets/imageUpload.png", "input")
  );
  menu.addOption(new Undo(["undo", "redo"], "assets/undo.png", "doubleBtn"));
  
  //create a toolbox for storing the tools
  toolbox = new Toolbox();

  //add the tools to the toolbox.
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(new SprayCanTool());
  toolbox.addTool(new MirrorDrawTool());
  toolbox.addTool(new RectangleTool());

  //create stroke tool
  const stroke = new Stroke();
  stroke.loadStrokeSlider();
}

function draw() {
  //call the draw function from the selected tool.
  //hasOwnProperty is a javascript function that tests
  //if an object contains a particular method or property
  //if there isn't a draw method the app will alert the user
  if (toolbox.selectedTool.hasOwnProperty("draw")) {
    toolbox.selectedTool.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}
