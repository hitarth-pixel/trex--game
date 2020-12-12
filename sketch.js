var trex;
var trexrun;
var ball ;
var ballImage;
var ground;
var ground2;
var cloud2;
var cloud;
var randomNumber;
var obstacle;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var PLAY=1;
var END=0;
var gameState=PLAY;
var invisibleground;
var obstaclegroup;
var cloudsGroup;
var score=0;
var gameOver;
var gameOver2;


function preload(){
  ground2=loadImage("ground2.png")
  
  trexrun=loadAnimation("trex1.png","trex3.png","trex4.png")
  
  cloud2=loadImage("cloud.png")
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
  gameOver=loadImage("gameOver.png");
  
  //ballImage=loadImage("ball.png")
}

function setup(){
  createCanvas(600,200)
  frameRate(30)
  
  ground=createSprite(200,180,600,20) 
  ground.addImage("g",ground2)
  ground.velocityX=-4
  ground.x=ground.width/2
  
  
  
  //creating invisible ground
  invisibleground= createSprite(300,190,600,10)
  invisibleground.visible=false;
  
  trex=createSprite(50,160,20,20)
trex.addAnimation("run", trexrun)
trex.scale=0.4;
  
gameOver2=createSprite(300,150,100,100);
gameOver2.addImage("gameover",gameOver);
gameOver2.visible=false;
  
obstaclegroup=new Group();
cloudsGroup=new Group();
  

  randomNumber=random(1,100);


}  


function draw(){
  background("white")
  console.log(ground.x);
  
  if(gameState===PLAY){
     if(keyDown("space")&&trex.y >= 165){                  
  trex.velocityY= -10
    
  }
     //gravity 
    trex.velocityY+=0.3 
    
   
    score = score+ Math.round(frameCount/60);
    ground.velocityX=-4;
      if (ground.x<0) {
   ground.x=ground.width/2; 
  }
    clouds();
  obstacles();
    
     if(obstaclegroup.isTouching(trex)){
      
      gameState=END;
    }
  }
     else if(gameState===END){
      ground.velocityX=0;
       
       cloudsGroup.setVelocityEach(0);
       obstaclegroup.setVelocityEach(0);
       gameOver2.visible=true;
       
     }
      
  trex.collide(invisibleground)
   
  text("Score: "+ score, 250, 100); 
  
  if(mousePressedOver(gameOver2)){
   restart();
    }
  
  

  drawSprites();
}




function clouds() {
if (frameCount%60===0) {
cloud=createSprite(600,120,40,10)
cloud.addImage("c",cloud2)
cloud.velocityX= -4
cloud.y=random(20,100);
  cloud.scale=0.7
  cloudsGroup.add(cloud);
  } 
  
}

function obstacles() {
  if(frameCount%80===0){
    obstacle=createSprite(600,180,40,40);
    obstacle.velocityX= -6
  //generate random obstacles
    var rand=Math.round(random(1,6))
    switch(rand){
      case 1:obstacle.addImage(obstacle1)
      break;
      case 2:obstacle.addImage(obstacle2)
      break;
      case 3:obstacle.addImage(obstacle3)
      break;
      case 4:obstacle.addImage(obstacle4)
      break;
      case 5:obstacle.addImage(obstacle5)
      break;
      case 6:obstacle.addImage(obstacle6)
      break;
      default:break;
    }
 obstacle.scale=0.5;
obstacle.lifetime=300;
  
  
  obstaclegroup.add(obstacle);
  }
  
}

function restart(){
  score=0;
  //ground.velocityX=-4;
gameOver2.visible=false;
gameState=PLAY;
  
obstaclegroup.destroyEach();

}


