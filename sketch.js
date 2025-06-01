let sceneManager;
let imgTable, imgWater, imgTeacher, imgBalloon;

function preload() {
  imgTable = loadImage("assets/20sWithTable.png");
  imgWater = loadImage("assets/water.png");
  imgTeacher = loadImage("assets/teacherAndChilpan.png");
  imgBalloon = loadImage("assets/sayBalloon.png");
}

function setup() {
  createCanvas(1366, 768);

  const no20 = new SceneA();  // 또는 No20으로 이름 바꿔도 좋아
  const yes20 = new Yes20();

  // 공통 이미지 삽입
  for (let scene of [no20, yes20]) {
    scene.WithTable = imgTable;
    scene.water = imgWater;
    scene.Teacher = imgTeacher;
    scene.sayBalloon = imgBalloon;
  }

  sceneManager = new SceneManager();
  sceneManager.addScene(no20);  // index 0
  sceneManager.addScene(yes20); // index 1
  sceneManager.setScene(0);     // 처음은 no20부터 시작
}

function draw() {
  sceneManager.update();
  sceneManager.draw();
}

function mousePressed() {
  sceneManager.mousePressed();
}
