var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds,clouds_big;
var cactus,cactus_problem;
var score=0 
var obstaclegroup;
var cloudsgroup;
var gameover,gameover_over;
var play=1
var end=0
var gamestate=play
var restart, restart_start;
var jump, die, checkPoint;
function preload() {
  
  // trex animation load
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  // ground image
  groundImage = loadImage("ground2.png")
  
  // clouds image
  clouds_big= loadImage("cloud12.png")
  
  //obstacles image
  cactus_problem=
  loadImage("obstacle1.png") 
  cactus_problem2=
  loadImage("obstacle2.png")
  cactus_problem3=
  loadImage("obstacle3.png") 
  cactus_problem4=
  loadImage("obstacle4.png") 
  cactus_problem5=
  loadImage("obstacle5.png")
  cactus_problem6 =
  loadImage("obstacle6.png")
  
  //game over image
  gameover_over= loadImage("gameOver.png")
  
  //restart image
  restart_start=
  loadImage("restart.png")
  
  // jump,die,checkpoint
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
  checkpoint=loadSound("checkPoint.mp3")
  
}

function setup() {
createCanvas(windowWidth,windowHeight);



//create a trex sprite
trex = createSprite(50,height-40,20,50);
trex.addAnimation("running", trex_running);
  trex.addAnimation ("collided",trex_collided);
trex.scale = 0.5;
trex.setCollider("circle",0,0,40)
  trex.debug=false;
//create a ground sprite
ground = createSprite(200,height-20,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -(4+ Math.round(score/100));
  
 //create a invisibleGround sprite 
  invisibleGround= createSprite(60,height-10,50,10)
  
  //making group
  obstaclegroup=new Group();
   cloudsgroups=new Group();
  
  //game over
  gameover= createSprite(width-400,height-100,50,20);
  gameover.addImage("over",gameover_over);
  gameover.scale=2.5
  
 

  // creating restart
  restart=createSprite(width-400,height-50,30,10);
  restart.addImage("startquick",restart_start);
  restart.scale=0.5
  
 
}

function draw()
{

  background(180);

  if (gamestate===play)
  {
    restart.visible=false
ground.velocityX = -(4+ Math.round(score/100));

    if(trex.isTouching(obstaclegroup))
        {
      
     gamestate=end
       // adding sound
    die.play()
    }
var n =5

//jump when the space button is pressed
    if ((touches.length>0|| keyDown("space"))&& trex.y>height-100) 
    {
      trex.velocityY = -10;
      jump.play()
    touches=[]   
    }
    
    if (ground.x < 0) 
    {
      ground.x = ground.width / 2;
    }
    
 cloud();
    obstacle();
    gameover.visible=false
    score= score+Math.round(frameCount/100)
    
    //adding checkpoint sound
    if(score%100===0 && score>0){
    checkpoint.play();
    }
  } 
  
  else if(gamestate===end){
    obstaclegroup.setLifetimeEach(-1);
    cloudsgroups.setLifetimeEach(-1);
    ground.velocityX=0
    obstaclegroup.setVelocityXEach(0)
    cloudsgroups.setVelocityXEach(0)
    gameover.visible=true
 trex.changeAnimation("collided",trex_collided)
    
   
  //restart in end state
    restart.visible=true
  }

//ground false state
  invisibleGround.visible=false
  trex.velocityY = trex.velocityY + 0.8

  stroke("White")
  textSize(15)
  text("Score "+ score,width-100,height-5)
if (mousePressedOver(restart)){
console.log("restart")
reset();
}


  trex.collide(invisibleGround);
  drawSprites();
}

// creating cloud
function cloud(){
  if(frameCount%100===0)
 { 
 //create clouds 
  clouds= createSprite(600,height-170);
  clouds.addImage(clouds_big);
  clouds.velocityX=-(4+Math.round(score/200))
  clouds.scale=0.08
  clouds.y=Math.round(random(height-190,height-100))
  
  trex.depth=clouds.depth+1
  clouds.lifetime=150
   cloudsgroups.add(clouds)
 } } 


// creating obstacles
function obstacle ()
{

  if(frameCount%100===0)
  { 
    
 //create clouds 
  cactus= createSprite(600,height-40);
  
  cactus.velocityX=-(4+ Math.round(score/150))
  cactus.scale=0.08
            

    var u = Math.round(random(1,6)) 

    switch (u){

      case 1: cactus.addImage(cactus_problem);
        cactus.scale=0.08
        break

;
      case 2: cactus.addImage(cactus_problem2); 
        cactus.scale=0.09
        break;
      case 3: cactus.addImage(cactus_problem3);
        cactus.scale=0.15
        break;
      case 4 : cactus.addImage(cactus_problem4); 
        cactus.scale=0.05
        break;
      case 5 : cactus.addImage(cactus_problem5);
        cactus.scale=0.05
        break;
      case 6 : cactus.addImage(cactus_problem6);
        cactus.scale=0.08
        break;
    }
    obstaclegroup.add(cactus)
    cactus.lifetime=150
  } }

function reset(){
gamestate= play;
obstaclegroup.destroyEach()
cloudsgroups.destroyEach()
score=0
  trex.changeAnimation("running", trex_running);

}
