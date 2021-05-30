var mouse, mouseG, mousei;
var bat, batI;
var score;
var bg, bgi;
var obs, obsi, obsG;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var gmo, gmoi;
function preload(){
   mousei = loadImage("mos.png");
   batI = loadImage("bat.png");
   bgi = loadImage("intr.png");
   obsi = loadImage("wire.png");
   gmoi = loadImage("go.png");
}

function setup() {
  createCanvas(400,500);
  mouseG = new Group();
  obsG = new Group();
  bg = createSprite(200,250,400,500);
  bg.addImage(bgi);
  bg.scale = 3;
  
  bat = createSprite(200,400); 
  bat.scale = 0.8;
  bat.addImage(batI);
  //bat.debug = true;
  bat.setCollider("circle",50,-50,50);
  
  gmo = createSprite(200,250);
  gmo.addImage(gmoi);
  
  score = 0;
  
}

function draw() {
  background(0);
  if(gameState === PLAY){
    gmo.visible = false;
    bat.x=World.mouseX;

  if(bat.isTouching(mouseG)){
    mouseG.destroyEach();
    score = score+2;
    mouse.velocityY = 0;
  }
   
    mos();
    wire();
    
  if(bat.isTouching(obsG)){
    gameState = END;
  }
    
  }
  if(gameState === END){
    gmo.visible = true;
     
    mouseG.destroyEach();
    obsG.destroyEach();
    
    if(mousePressedOver(gmo)){
      reset();
    }
  }
  drawSprites();
  textSize(25);
  text("score :"+ score,150,50);
}

function mos(){
  if(frameCount % 175 === 0 ){
    mouse = createSprite(Math.round(random(0,400)));
    mouse.velocityY = 2;
    mouse.addImage(mousei);
    mouse.lifetime = 300;
    mouse.scale = 0.3;
    mouseG.add(mouse);
    //mouse.debug = true;
    mouse.setCollider("circle",0,0,50);
    if(score % 50 ===0){
    mouse.velocityY = mouse.velocityY+2;
  }
}
}
function wire(){
  if(frameCount % 150 === 0){
    obs = createSprite(Math.round(random(0,400)));
    obs.velocityY = 2;
    obs.addImage(obsi);
    obs.lifetime = 300;
    obs.scale = 0.3;
    obsG.add(obs);
    //obs.debug = true;
    obs.setCollider("rectangle",0,0,obs.width,20);
  }
}


function reset(){
  score = 0;
  gameState = PLAY;

}