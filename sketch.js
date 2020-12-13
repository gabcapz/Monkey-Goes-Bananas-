var PLAY;
var END;
var gameState = PLAY;

var monkey, monkey_running, back, back1, back2, backgroundImage;

var banana, bananaImage, obstacle, obstacle1, obstacleImage, gameOverImage, gameOver, backSound, MonkeySound, endSound;

var FoodGroup, obstacleGroup;

var score

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

  backgroundImage = loadImage("back.jpg");
  gameOverImage = loadImage("gameOver3.jpg")

  obstacleImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png");


  backSound = loadSound("Jungle.wav");
  endSound = loadSound("samba.wav");
}



function setup() {
  createCanvas(400, 400)

  ground = createSprite(150, 350, 500, 10);

  back = createSprite(200, 200);
  back.addImage(backgroundImage);
  back.scale = 1.1;

  back1 = createSprite(750, 200);
  back1.addImage(backgroundImage);
  back1.scale = 1.1;

  back2 = createSprite(1300, 200);
  back2.addImage(backgroundImage);
  back2.scale = 1.1;

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  gameOver = createSprite(200, 200);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1.55;


  score = 0;

  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = false;

  backSound.play();
  backSound.loop();

}


function draw() {
  background("white");

  ground.visible = false;

  if (gameState === PLAY) {

    spawnObstacles();
    spawnFood();

    gameOver.visible = false;
    back.visible = true;
    back2.visible = true;
    back1.visible = true;

    back.velocityX = -(4 + 2 * score / 10);
    back1.velocityX = -(4 + 2 * score / 10);
    back2.velocityX = -(4 + 2 * score / 10);

    if (back.x < -270) {
      back.x = 1300;
    }

    if (back1.x < -270) {
      back1.x = 1300;
    }

    if (back2.x < -270) {
      back2.x = 1300;
    }

    if (keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      score = score + 2;
    }

    if (monkey.isTouching(obstacleGroup)) {
      back.velocityX = 0;
      back1.velocityX = 0;
      back2.velocityX = 0;
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      back.visible = false;
      back1.visible = false;
      back2.visible = false;
      monkey.visible = false;

      if (!endSound.isPlaying()) {
        endSound.play();
        endSound.loop = false;
      }

      backSound.stop();
      backSound.loop = false;
      gameState = END;
      gameOver.visible = true;
      obstacle.visible = false;
      banana.visible = false;

    }

  }

  if (keyWentDown("r") && gameState === END) {
    gameState = PLAY;

    backSound.play();

    endSound.stop();

    gameOver.visible = false;
    back.visible = true;
    back1.visible = true;
    back2.visible = true;
    monkey.visible = true;

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();

    score = 0;
  }

  monkey.collide(ground);

  drawSprites();
  stroke("blue");
  textFont("Lobster");
  textSize(24);
  text("Banana Points : " + score, 200, 70);

  if (monkey.isTouching(obstacleGroup)) {
    stroke("red");
    textFont("Algerian");
    textSize(24);
    text("Press 'r' to restart", 70, 350);
  }

}

function spawnObstacles() {

  if (frameCount % 200 === 0) {
    obstacle = createSprite(600, 325);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;

    obstacle.setCollider("rectangle", 0, 0, obstacle.width, obstacle.height);
    obstacle.debug = false;

    obstacleGroup.add(obstacle);
  }
}

function spawnFood() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600, 200, 20, 20);
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.scale = 0.1;
    banana.lifetime = 100;

    banana.y = Math.round(random(180, 250));

    FoodGroup.add(banana);
  }

}