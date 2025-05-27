let sceneManager;

function setup() {
  createCanvas(800, 600);
  sceneManager = new SceneManager();
  sceneManager.addScene(new SceneA());
  sceneManager.addScene(new SceneB());
  sceneManager.setScene(0);
}

function draw() {
  background(0);
  sceneManager.update();
  sceneManager.draw();
}

function keyPressed() {
  if (key === ' ') {
    sceneManager.nextScene();
  }
}
