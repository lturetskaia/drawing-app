class SaveCanvas extends MenuItem{
  constructor(name, icon, type) {
    super(name, icon, type);
    this.label = 'Save image';
  }

  click() {
    saveCanvas("image", "jpg");
  }
}
