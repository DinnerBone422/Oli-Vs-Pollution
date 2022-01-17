var backgroundImg, runningManImg, collidedManImg, stoneImg, gameOverImg, restartImg;
var pantingSound, collidedSound, jumpSound, trashSound;
var backGround, man, stonesGroup, trashsGroup, invisibleGround, gameOver, restart;
var distance, speed, score, gameState, play, end;

function preload() {
  backgroundImg = loadImage("https://johaansolo.github.io/Oli-Vs.-Pollution-2/assets/full_background.png");

  gameOverImg = loadImage("https://johaansolo.github.io/Oli-Vs.-Pollution-2/assets/gameOver.png");
  restartImg = loadImage("https://johaansolo.github.io/Oli-Vs.-Pollution-2/assets/restart.png");

  stoneImg = loadImage("https://johaansolo.github.io/Oli-Vs.-Pollution-2/assets/stone.png");
  trash1Img = loadImage("https://johaansolo.github.io/Oli-Vs.-Pollution-2/assets/Trash 1.jfif");
  trash2Img = loadImage("https://johaansolo.github.io/Oli-Vs.-Pollution-2/assets/Trash 2.png");

  runningManImg = loadAnimation("https://johaansolo.github.io/Oli-Vs.-Pollution-2/assets/Running Man Frame 1.png", "https://johaansolo.github.io/Oli-Vs.-Pollution-2/assets/Running Man Frame 2.png", "https://johaansolo.github.io/Oli-Vs.-Pollution-2/assets/Running Man Frame 3.png", "https://johaansolo.github.io/Oli-Vs.-Pollution-2/assets/Running Man Frame 4.png");
  collidedManImg = loadAnimation("https://johaansolo.github.io/Oli-Vs.-Pollution-2/assets/Running Man Frame 2.png");

  collidedSound = loadSound("./assets/collided.wav");
  jumpSound = loadSound("./assets/jump.wav");
  //trashSound = loadSound("./assets/picked_Trash.mp3");
  pantingSound = loadSound("./assets/panting.mp3");

}

function setup() {
  console.log("Game BY:");
  console.log("Johaan Paul");
  createCanvas(window.innerWidth, window.innerHeight);

  backGround = createSprite(window.innerWidth /2, window.innerHeight /2 -60, window.innerWidth, window.innerHeight);
  backGround.scale = 0.7;
  backGround.addImage(backgroundImg);

  man = createSprite(window.innerWidth /4, window.innerHeight /1.3, window.innerWidth, window.innerHeight);
  man.scale = 2.5;
  man.addAnimation("running", runningManImg);
  man.addAnimation("collided", collidedManImg);
  man.setCollider("rectangle", 0, 0);

  stonesGroup = new Group();

  trashsGroup = new Group();

  gameOver = createSprite(window.innerWidth /2, window.innerHeight /2, window.innerWidth, window.innerHeight);
  gameOver.scale = 2;
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  invisibleGround = createSprite(window.innerWidth /2, window.innerHeight /1.05, window.innerWidth *3, window.innerHeight /5);
  invisibleGround.visible = false;
  invisibleGround.setCollider("rectangle", 0, 0);
  invisibleGround.debug = true;

  restart = createSprite(window.innerWidth /2, window.innerHeight /1.5, window.innerWidth, window.innerHeight)
  restart.scale = 0.15;
  restart.addImage(restartImg);
  restart.visible = false;

  speed = -5;
  distance = 0;
  score = 0;
  play = 0;
  end = 1;
  gameState = play;

  pantingSound.loop();
}

function draw() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  background(0, 0, 0);
  backGround.velocityX = speed;
  if (gameState === play) {
    if (backGround.x < window.innerWidth/3.2) {
      backGround.x = window.innerWidth/2;
    }

    speed = speed -0.01;
    distance = distance + 0.5

    if(keyDown("space") && man.y >= window.innerHeight /1.35) {
      jumpSound.play();
      man.velocityY = -16;
    }
    
    man.velocityY = man.velocityY + 0.8
    man.collide(invisibleGround);
    
    spawnStones();
    spawnTrash();
    
    if (stonesGroup.isTouching(man)) {
      collidedSound.play();
      gameState = end;
    }
    if (trashsGroup.isTouching(man)) {
      //trashSound.play();
      score = score +1;
      trashsGroup.destroyEach();
      //trashSound.stop();
    }
  }

  else if (gameState === end) {
    speed = 0;

    man.velocityY = 0;
    man.changeAnimation("collided", collidedManImg);
    gameOver.visible = true; 
    pantingSound.stop();
  }

  drawSprites();
  stonesGroup.setVelocityXEach(speed);
  trashsGroup.setVelocityXEach(speed);
  textSize(20);
  stroke(3);
  fill("black");
  text("score: " + score, window.innerWidth /2, 50);
  
}

function spawnStones() {
  if (frameCount % 120 === 0) {
    var stone = createSprite(window.innerWidth,window.innerHeight/1.2,40,40);
    stone.setCollider("rectangle",0,0,200,200)
    stone.addImage(stoneImg);
    stone.velocityX = speed;
    stone.scale = 0.15;
    stone.lifetime = 400;
    stonesGroup.add(stone);
  }
}

function spawnTrash() {
  if (frameCount % 150 === 0) {
    var trash = createSprite(window.innerWidth,window.innerHeight/1.2,100,100);
    trash.velocityX = speed
    trash.scale = 0.15;
    trash.addImage(trash2Img);
    trash.lifetime = 400;
    trash.setCollider("rectangle",0,0,trash.width/2,trash.height/2)
    trash.debug=true;
    trashsGroup.add(trash);
  }
}
