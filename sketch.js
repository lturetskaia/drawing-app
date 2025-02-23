//global variables that will store the toolbox colour palette
//amnd the helper functions

let toolbox;
let menu;
let strokeSlider;
let toolTip;

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

  // event listener for creating undo snapshots
  canvas.mouseClicked((mouseEvent) => {
    if (
      toolbox.selectedTool.name !== "mirror" &&
      toolbox.selectedTool.name !== "shape" &&
      toolbox.selectedTool.name !== "select" &&
      toolbox.selectedTool.name !== "eraser"
    ) {
      saveUndoSnapshot();
    } else if (
      toolbox.selectedTool.name === "select" &&
      toolbox.selectedTool.mode === "paste"
    ) {
      //mouse click in paste mode pastes an image
      toolbox.selectedTool.pasteImage();
    }
  });

  //create the colour palette
  const colourPalette = new ColourPalette();
  colourPalette.loadColoursMenu();

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
  toolbox.addTool(new SelectTool("select"));
  toolbox.addTool(new PencilTool("pencil"));
  toolbox.addTool(new LineTool("line"));
  toolbox.addTool(new SprayCanTool("spray"));
  toolbox.addTool(new MirrorDrawTool("mirror"));
  toolbox.addTool(new ShapeTool("shape"));
  toolbox.addTool(new EraserTool("eraser"));
  toolbox.addTool(new BucketTool("bucket"));

  //create stroke tool
  strokeSlider = new StrokeSlider(1, 100);
  strokeSlider.loadStrokeSlider();

  //create a tooltip
  toolTip = new ToolTip();
  toolTip.create();
}

function draw() {
  //call the draw function from the selected tool.
  //hasOwnProperty is a javascript function that tests
  //if an object contains a particular method or property
  //if there isn't a draw method the app will alert the user
  if (toolbox.selectedTool.draw) {
    if (toolbox.selectedTool.name === "bucket") {
      //no auto use of draw() on bucket tool
      // it is activated by the event listener on canvas
      return;
    }
    toolbox.selectedTool.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}
