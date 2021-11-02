var bg, bgImg
var bottomGround
var topGround
var jones, jonesImg, gameState = 0;
var tree, TreeGrp;
var rock, RockGrp;
var witch, WitchGrp;
var bullet, BulletGrp;

function preload() {
  bgImg = loadImage("assets/bg.png")

  jonesImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  //background image
  /*bg = createSprite(600,375);
  bg.addImage(bgImg);
  bg.scale = 1.9;*/

  //creating top and bottom grounds
  bottomGround = createSprite(600, 700, 2100, 500);
  bottomGround.visible = true;


  topGround = createSprite(600, 0, 2000, 20);
  topGround.visible = false;

  //creating balloon     
  jones = createSprite(100, 200, 20, 50);
  jones.addAnimation("jones", jonesImg);
  jones.scale = 0.2;

  TreeGrp = new Group();
  RockGrp = new Group();
  WitchGrp = new Group();
  BulletGrp = new Group();





}

function draw() {
  background(bgImg);

  //making the hot air jones jump
  if (keyDown("space")) {
    jones.velocityY = -6;

  }

  //adding gravity
  jones.velocityY = jones.velocityY + 0.5;



  jones.collide(bottomGround);

  /*if (keyDown("right")) {
    jones.position.x += 3;
  }
  if (keyDown("left")) {
    jones.position.x -= 3;
  }*/

  if (jones.isTouching(topGround)) {
    gameState = 1;
    jones.destroy();
  }

  if(keyWentDown("right")){
    bullet = createSprite(jones.x, jones.y,20,20);
    bullet.shapeColor = "black";
    bullet.velocityX = 15;
    BulletGrp.add(bullet);
  }

  if (BulletGrp.isTouching(WitchGrp)) {
    for (var i = 0; i < BulletGrp.length; i += 1) {
      for(var j=0; j<WitchGrp.length; j +=1){
        if (BulletGrp[i].isTouching(WitchGrp[j])) {
          BulletGrp[i].destroy();
          WitchGrp[j].destroy();
        }
      }
      
    }
  }



  textSize(25);
  text("x:" + mouseX + "y:" + mouseY, mouseX, mouseY);

  treeSpawn();
  if (TreeGrp.isTouching(jones)) {
    for (var i = 0; i < TreeGrp.length; i += 1) {
      if (TreeGrp[i].isTouching(jones)) {
        TreeGrp[i].destroy();
      }
    }
  }

  rockSpawn();
  if (RockGrp.isTouching(jones)) {
    for (var i = 0; i < RockGrp.length; i += 1) {
      if (RockGrp[i].isTouching(jones)) {
        RockGrp[i].destroy();
      }
    }
  }

  witchSpawn();
  

  drawSprites();

}

function treeSpawn() {
  if (frameCount % 120 === 0) {
    tree = createSprite(windowWidth + 20, 430, 20, 40);
    tree.velocityX = -5;
    tree.shapeColor = "red";
    tree.lifetime = 350;
    tree.debug = true;
    TreeGrp.add(tree);
  }
}

function rockSpawn() {
  if (frameCount % 200 === 0) {
    rock = createSprite(windowWidth + 20, 430, 20, 40);
    rock.velocityX = -9;
    rock.shapeColor = "blue";
    rock.lifetime = 200;
    rock.debug = true;
    RockGrp.add(rock);
  }
}

function witchSpawn(){
  if(frameCount%300 === 0){
    witch = createSprite(windowWidth+20, 200, 20, 40);
    witch.velocityX = -8;
    witch.shapeColor = "green";
    witch.lifetime = 200;
    witch.debug = true;
    WitchGrp.add(witch);
  }
}
