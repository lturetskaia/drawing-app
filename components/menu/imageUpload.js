class ImageUpload extends MenuItem {
  constructor(name, icon, type) {
    super(name, icon, type);
  }

  click() {
    console.log("image selected!");

    let imageFile = select(`#${this.name}Input`).elt.files[0];
    // prevent image loading if the user cancels without picking a file
    if (!imageFile) {
      return;
    }
    let img;
    // read the target image datawith FileReader
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    // when finished data reading, load the image and add it to canvas
    fileReader.onloadend = function () {
      console.log(fileReader.result);
      img = loadImage(fileReader.result, () => image(img, 10, 10));
      // save a snapshot to history
      saveUndoSnapshot();
    };

    //clear input files
    select(`#${this.name}Input`).elt.value = "";
  }
}
