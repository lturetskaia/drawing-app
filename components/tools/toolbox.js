//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {
  const self = this;
  this.tools = [];
  this.selectedTool = null;

  const toolbarItemClick = function () {
    //remove any existing borders
    const items = selectAll(".sideBarItem");
    for (let i = 0; i < items.length; i++) {
      items[i].removeClass("active");
    }

    const toolName = this.id().split("sideBarItem")[0];
    self.selectTool(toolName);

    //call loadPixels to make sure most recent changes are saved to pixel array
    loadPixels();
  };

  //add a new tool icon to the html page
  const addToolIcon = function (icon, name, label) {
    const sideBarItem = createDiv(`<img src=${icon} alt = ${label} ></div>`);
    sideBarItem.class("sideBarItem");
    sideBarItem.id(name + "sideBarItem");
    const sidebar = select(".sidebar");
    sideBarItem.parent(sidebar);
    sideBarItem.mouseClicked(toolbarItemClick);
  };

  //add a tool to the tools array
  this.addTool = function (tool) {
    //check that the object tool has an icon and a name
    if (!tool.icon || !tool.name) {
      alert("make sure your tool has both a name and an icon");
    }
    this.tools.push(tool);
    addToolIcon(tool.icon, tool.name, tool.label);
    //if no tool is selected (ie. none have been added so far)
    //make this tool the selected one.
    if (this.selectedTool == null) {
      this.selectTool(tool.name);
    }
  };

  this.selectTool = function (toolName) {
    //search through the tools for one that's name matches the toolName
    for (let i = 0; i < this.tools.length; i++) {
      if (this.tools[i].name == toolName) {
        //if the tool has an unselectTool method run it.
        if (this.selectedTool != null && this.selectedTool.unselectTool) {
          this.selectedTool.unselectTool();
        }
        //select the tool and highlight it on the toolbar
        this.selectedTool = this.tools[i];
        select("#" + toolName + "sideBarItem").addClass("active");

        //if the tool is eraser, set the stroke to previously selected value
        if (this.selectedTool.name === "eraser") {
          strokeSlider.changeMode('eraser');
        }

        //if the tool has an options area. Populate it now.
        if (this.selectedTool.populateOptions) {
          this.selectedTool.populateOptions();
        }
      }
    }
  };
}
