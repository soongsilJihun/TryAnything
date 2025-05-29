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

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}