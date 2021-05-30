var obs
var score=0
var PLAY=1
var END=0
var gameState=PLAY
//preload the images here
function preload (){
BgImage=loadImage("bgimg.png")
bimg=loadImage("bullets (2).png")


barry= loadImage("BarryBoi.png")
boi= loadImage("deadbarry boi.png")
restart= loadImage("restart.png")
coins=loadImage("coins.png")
rocket=loadImage("rocket.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg= createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight)
bg.addImage(BgImage)
bg.scale=2
g= createSprite(200,windowHeight-30,20,20)
g.velocityY=4
g.addImage(barry)
g.scale=0.25
ground= createSprite(windowWidth/2,windowHeight,windowWidth,40)
obsGrp=new Group()
bstGrp= new Group()
bg.velocityX=(score+2)*-3
upg=createSprite(windowWidth/2,0,windowWidth,40)
res=createSprite(300,300)
res.addImage(restart)
}

function draw() {
  background("green");
 
  if(gameState===PLAY){
if(bg.x<300){
  bg.x=windowWidth/2
}
bg.velocityX=-4
res.visible=false
if(keyDown("space")){
g.velocityY=-15
createArrow();
}
g.velocityY=g.velocityY+0.6
g.collide(ground)
g.collide(upg)
Beasts();
obstacles();
if(bstGrp.isTouching(g)){
bstGrp.destroyEach();
score+=1
}
  

  }
if(obsGrp.isTouching(g)){
 gameState=END
}
else if(gameState===END){
  obsGrp.setVelocityXEach(0)
  g.collide(ground)
res.visible=true
  bg.velocityX=0
  g.velocityY+=4
  g.addImage(boi);
  g.scale=0.25
  bstGrp.setVelocityXEach(0)
  obsGrp.setLifetimeEach(-1)
  bstGrp.setLifetimeEach(-1)
  if(mousePressedOver(res)){
reset();
  }
}

console.log(g.y)
//box11.display();
drawSprites();
fill("black")
textSize(20)
text("Coins: "+score,200,200)
}
function obstacles(){
  if(frameCount%200===0){
    obs= createSprite(windowWidth,200,20,20)
    obs.velocityX=(score+2)*-3
  obs.y=Math.round(random(100,600))
    obs.width=Math.round(random(50,80))
    obs.lifetime=windowWidth
    obs.collide(ground)
    obs.addImage(rocket)
    obs.scale=0.2
    obsGrp.add(obs)
  }
}
function Beasts(){
  if(frameCount%240===0){
    beast= createSprite(windowWidth,200,80,20)
  
    beast.velocityX=(score+2)*-3
  beast.y=Math.round(random(700,300))
    beast.lifetime=windowWidth
    beast.collide(ground)
   
   beast.addImage(coins)
    bstGrp.add(beast)
    beast.scale=0.19
  }
}
function createArrow() {
  var arrow= createSprite(100,g.y, 10, 10);
arrow.x=225
  arrow.addImage(bimg)
arrow.scale=0.2
  arrow.velocityY = 20;
  arrow.velocityX=-9
  arrow.lifetime = 100
}
function reset(){
  gameState=PLAY;
  res.visible=false
  obsGrp.destroyEach();
  bstGrp.destroyEach();
  g.addImage(barry)
  score=0
}