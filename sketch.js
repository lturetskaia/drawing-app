//global variables that will store the toolbox colour palette
//amnd the helper functions

let toolbox;
let menu;
let strokeSlider;

function setup() {
  //create a canvas to fill the content div from index.html

  const canvasContainer = select("#content");
  const canvas = createCanvas(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  canvas.mouseClicked(() => {
    if (toolbox.selectedTool.name === "bucket") {
      toolbox.selectedTool.draw(colourPalette.selectedFillColour.rgba);
    }
  });
  background(255);
  canvas.parent("content");
  canvas.mouseReleased(() =>
    toolbox.selectedTool.name !== "mirrorDraw" && toolbox.selectedTool.name !=='rectangle' ? saveUndoSnapshot() : null
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
  toolbox.addTool( new EditImageTool('editImage', 'assets/editImage.jpg'));
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(new SprayCanTool());
  toolbox.addTool(new MirrorDrawTool());
  toolbox.addTool(new RectangleTool("rectangle", "assets/rectangle.jpg"));
  toolbox.addTool(new EraserTool("eraser", "assets/eraser.jpg"));
  toolbox.addTool(new BucketTool("bucket", "assets/bucket.png"));

  //create stroke tool
  strokeSlider = new StrokeSlider(1, 100);
  strokeSlider.loadStrokeSlider();
}

function draw() {
  //call the draw function from the selected tool.
  //hasOwnProperty is a javascript function that tests
  //if an object contains a particular method or property
  //if there isn't a draw method the app will alert the user
  if (toolbox.selectedTool.draw) {
    if (toolbox.selectedTool.name === "bucket") {
      return;
    }
    toolbox.selectedTool.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}