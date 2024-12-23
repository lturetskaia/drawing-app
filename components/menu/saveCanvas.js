class SaveCanvas extends MenuItem{
  constructor(name, icon, type) {
    super(name, icon, type);
  }

  click() {
    saveCanvas("image", "jpg");
  }
}
