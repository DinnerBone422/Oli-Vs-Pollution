var FloorImg, SkyImg, runningManImg, collidedManImg, stoneImg, gameOverImg, restartImg;
var pantingSound, collidedSound, jumpSound, trashSound;
var Floor, Sky, man, stonesGroup, trashsGroup, invisibleGround, gameOver, restart;
var distance, speed, score, gameState, play, end;
var canvasW, canvasH;

function preload() {
  FloorImg = loadImage("/Assets/Floor.png");
  SkyImg = loadImage("/Assets/Sky.png");

  gameOverImg = loadImage("/Assets/gameOver.png");
  restartImg = loadImage("/Assets/restart.png");

  stoneImg = loadImage("/Assets/stone.png");
  trash1Img = loadImage("/Assets/Trash 1.jfif");
  trash2Img = loadImage("/Assets/Trash 2.png");

  runningManImg = loadAnimation("/Assets/Running Man Frame 1.png", "/Assets/Running Man Frame 2.png", "/Assets/Running Man Frame 3.png", "/Assets/Running Man Frame 4.png");
  collidedManImg = loadAnimation("/Assets/Running Man Frame 2.png");

  collidedSound = loadSound("/Assets/collided.wav");
  jumpSound = loadSound("/Assets/jump.wav");
  //trashSound = loadSound("/Assets/picked_Trash.mp3");
  //pantingSound = loadSound("/Assets/panting.mp3");

}

function setup() {
	canvasW = windowWidth/1.5;
	canvasH = windowHeight/1.5;
	var canvas = createCanvas(canvasW, canvasH);
	canvas.parent('Game');
	rectMode(CENTER);
  
  Sky = createSprite(canvasW /2, canvasH/1.05, canvasW, canvasH);
  Sky.scale = 0.7;
  Sky.addImage(SkyImg);

  Floor = createSprite(canvasW /2, canvasH/1.05, canvasW, canvasH);
  Floor.scale = 0.7;
  Floor.addImage(FloorImg);



  man = createSprite(canvasW /4, canvasH /1.3, canvasW, canvasH);
  man.scale = 2.5;
  man.addAnimation("running", runningManImg);
  man.addAnimation("collided", collidedManImg);
  man.setCollider("rectangle", 0, 0);

  stonesGroup = new Group();

  trashsGroup = new Group();

  gameOver = createSprite(canvasW /2, canvasH /2, canvasW, canvasH);
  gameOver.scale = 2;
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  invisibleGround = createSprite(canvasW /2, canvasH /1.05, canvasW *3, canvasH /5);
  invisibleGround.visible = false;
  invisibleGround.setCollider("rectangle", 0, 0);
  invisibleGround.debug = true;

  restart = createSprite(canvasW /2, canvasH /1.5, canvasW, canvasH)
  restart.scale = 0.15;
  restart.addImage(restartImg);
  restart.visible = false;

  speed = -5;
  distance = 0;
  score = 0;
  play = 0;
  end = 1;
  gameState = play;

  //pantingSound.loop();
}

function draw() {
  resizeCanvas(canvasW, canvasH);
  background(13,207,239);
  Floor.velocityX = speed;
  Sky.velocityX = speed;
  if (gameState === play) {
    if (Floor.x < canvasW/3.2) {
      Floor.x = canvasW/2;
    }
    
    if (Sky.x < canvasW/3.2) {
      Sky.x = canvasW/2;
    }

    speed = speed -0.01;
    distance = distance + 0.5



    
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
    //pantingSound.stop();
  }

  drawSprites();
  stonesGroup.setVelocityXEach(speed);
  trashsGroup.setVelocityXEach(speed);
  textSize(20);
  stroke(3);
  fill("black");
  text("score: " + score, canvasW /2, 50);
}

function Jump() {
  if(man.y >= height/1.5) {
    jumpSound.play();
    man.velocityY = -16;
  }
}

function spawnStones() {
  if (frameCount % 120 === 0) {
    var stone = createSprite(canvasW,canvasH/1.2,40,40);
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
    var trash = createSprite(canvasW,canvasH/1.2,100,100);
    trash.velocityX = speed
    trash.scale = 0.15;
    trash.addImage(trash2Img);
    trash.lifetime = 400;
    trash.setCollider("rectangle",0,0,trash.width/2,trash.height/2)
    trash.debug=true;
    trashsGroup.add(trash);
  }
}