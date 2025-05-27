class SceneManager {
  constructor() {
    this.scenes = [];
    this.currentIndex = 0;
    this.transitioning = false;
    this.transitionProgress = 0;
    this.transitionSpeed = 20;
    this.currentScene = null;
    this.nextSceneObj = null;
  }

  addScene(scene) {
    this.scenes.push(scene);
    scene.manager = this;
  }

  setScene(index) {
    this.currentIndex = index;
    this.currentScene = this.scenes[index];
    this.currentScene.setup();
  }

  nextScene() {
    if (this.transitioning || this.currentIndex + 1 >= this.scenes.length) return;

    this.transitioning = true;
    this.transitionProgress = 0;
    this.nextSceneObj = this.scenes[this.currentIndex + 1];
    this.nextSceneObj.setup();
  }

  update() {
    if (this.transitioning) {
      this.transitionProgress += this.transitionSpeed;
      if (this.transitionProgress >= width) {
        this.transitioning = false;
        this.setScene(this.currentIndex + 1);
        this.transitionProgress = 0;
      }
    } else {
      this.currentScene.update();
    }
  }

  draw() {
    if (this.transitioning) {
      push();
      translate(-this.transitionProgress, 0);
      this.currentScene.draw();
      pop();

      push();
      translate(width - this.transitionProgress, 0);
      this.nextSceneObj.draw();
      pop();
    } else {
      this.currentScene.draw();
    }
  }
}
