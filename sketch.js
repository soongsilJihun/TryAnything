let sceneManager;

// 각 씬 인스턴스를 전역에서 관리
let scenes = [];

function preload() {
  // 필요한 씬만 preload 호출
  scenes = [
    new StartScene(),
    new No20(),
    new No30(),
    new No40(),
    new Imjong(),
    new ReturnScene(),
    new Yes20(),
    new HandCheckScene(),
    new Yes20AfterHand(),
    new Yes30(),
    new Wedding30(),
    new FamilyPic40(),
    new Yes40(),
    new Youtube40(),
    new HappyEnd(),
    new LastScene()
  ];

  // preload()가 있는 경우만 호출
  for (let scene of scenes) {
    if (typeof scene.preload === "function") {
      scene.preload();
    }
  }
}

function setup() {
  createCanvas(1366, 768);

  sceneManager = new SceneManager();

  // 씬 등록 및 manager 설정
  for (let scene of scenes) {
    sceneManager.addScene(scene);
  }

  sceneManager.setScene(3); // StartScene부터 시작
}

function draw() {
  sceneManager.update();
  sceneManager.draw();
}

function mousePressed() {
  sceneManager.mousePressed();
}
function keyPressed() {
  sceneManager.keyPressed();
}

