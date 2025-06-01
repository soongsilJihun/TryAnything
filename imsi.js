let WithTable, water, Teacher, sayBalloon;
let waterx, watery;
let chx, chy;
let thx, thy;

// 대사 스크립트
let dialogues = [
  { text: "질문 있는 사람?", x: 0, y: 0, align: CENTER, speed: 2, speaker: "prof" },
  { text: "(얘네 표정이 꼬롬한데..)", x: 0, y: 0, align: CENTER, speed: 2, speaker: "prof" },
  { text: "질문 없으면 수업 마치겠습니다!!", x: 0, y: 0, align: CENTER, speed: 2, speaker: "prof" },
  { text: "(아 잘 모르겠는데.. 아...)", x: 0, y: 0, align: CENTER, speed: 2, speaker: "student" }
];

let currentIndex = 0;
let charIndex = 0;
let typedText = "";
let typeTimer = 0;
let isTyping = false;

function preload() {
  WithTable = loadImage("assets/20sWithTable.png");
  water = loadImage("assets/water.png");
  Teacher = loadImage("assets/teacherAndChilpan.png");
  sayBalloon = loadImage("assets/sayBalloon.png");
}

function setup() {
  createCanvas(1366, 768);
  chx = width / 2 + 400;
  chy = height / 2;
  thx = width / 2 - 400;
  thy = height / 2;
  waterx = chx - 60;
  watery = chy - 80;

  // 각 대사의 텍스트 좌표 설정
  dialogues[0].x = thx + 100; dialogues[0].y = thy - 150;
  dialogues[1].x = thx + 100; dialogues[1].y = thy - 150;
  dialogues[2].x = thx + 100; dialogues[2].y = thy - 150;
  dialogues[3].x = chx + 80;  dialogues[3].y = chy - 250;

  startTyping();
}

function draw() {
  background(255);
  rectMode(CENTER);
  imageMode(CENTER);

  image(WithTable, chx, chy, 400, 400);
  image(Teacher, thx, thy, 500, 400);

  // 물방울
  image(water, waterx, watery, 8, 20);
  watery += 2;
  if (watery > chy - 50) watery = chy - 80;

  drawBalloon();       // 말풍선 이미지
  updateDialogue();    // 타이핑 진행
  drawDialogue();      // 텍스트 출력

  // 하단 안내 텍스트
  fill(0);
  textSize(20);
  textAlign(CENTER, BOTTOM);
  text("말풍선을 클릭해보세요", width / 2, height - 40);
}

function drawBalloon() {
  if (currentIndex >= dialogues.length) return;
  let dlg = dialogues[currentIndex];
  let bx = dlg.speaker === "prof" ? thx + 100 : chx + 80;
  let by = dlg.speaker === "prof" ? thy - 150 : chy - 250;
  image(sayBalloon, bx, by, 300, 200);
}

function updateDialogue() {
  if (!isTyping || currentIndex >= dialogues.length) return;
  let dlg = dialogues[currentIndex];
  if (charIndex < dlg.text.length) {
    typeTimer++;
    if (typeTimer >= dlg.speed) {
      typedText += dlg.text[charIndex];
      charIndex++;
      typeTimer = 0;
    }
  }
}

function drawDialogue() {
  if (currentIndex >= dialogues.length) return;
  let dlg = dialogues[currentIndex];

  fill(0);
  textSize(20);
  textAlign(dlg.align, CENTER);
  text(typedText, dlg.x, dlg.y);
}

function mousePressed() {
  if (currentIndex >= dialogues.length) return;

  if (charIndex < dialogues[currentIndex].text.length) {
    // 아직 타이핑 중이면 전체 출력
    typedText = dialogues[currentIndex].text;
    charIndex = typedText.length;
    isTyping = false;
  } else if (currentIndex < dialogues.length - 1) {
    // 다음 대사로
    currentIndex++;
    startTyping();
  }
}

function startTyping() {
  let dlg = dialogues[currentIndex];
  typedText = "";
  charIndex = 0;
  typeTimer = 0;
  isTyping = true;
}
