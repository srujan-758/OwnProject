class Game{
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    yellowCannon = createSprite(100,200);
    yellowCannon.shapeColor = "yellow";
    yellowCannon.addImage("yellowCannon",yellowCannonimg);
    yellowCannon.scale=0.7;
    redCannon = createSprite(300,200);
    redCannon.shapeColor="red";
    redCannon.addImage("redCannon",redCannonimg);
    redCannon.scale=0.7;
    cannons=[yellowCannon,redCannon];
    
  }

  play(){
    form.hide();
    background(34,177,76);

    Player.getPlayerInfo();

    if (allPlayers!==undefined){
      var x=0;
      var y=350;
      var index=0;

      for(var plr in allPlayers){
        x=allPlayers[plr].x
        index=index+1;
        cannons[index-1].x=x;
        cannons[index-1].y=y;

        text("Player1:"+allPlayers.player1.score,600,20);
        //text("Player2:"+allPlayers.player2.score,600,30);

      }
    }

   if(keyIsDown(LEFT_ARROW)&&player.index!==null){
      player.x-=2;
      player.update();
   } 

   if(keyIsDown(RIGHT_ARROW)&&player.index!==null){
    player.x+=2;
    player.update();
 } 

  if(keyWentDown(UP_ARROW)&&player.index!==null){
    console.log(player.y);
    var bullet=createSprite(player.x,player.y,20,20);
    bullet.shapeColor="red";
    bullet.velocityY=-2;
    bulletGroup.add(bullet);
    cannonshoot.play();
  }

  if(frameCount%80==0){
     yellowPlane= createSprite(-5,Math.round(random(10, 100)),10,10);
     yellowPlane.velocityX=+3;
     yellowPlane.shapeColor="yellow";
     yellowPlaneGroup.add(yellowPlane);
  }

  if(frameCount%80==0){
    redPlane= createSprite(705,Math.round(random(10,100)),10,10);
    redPlane.velocityX=-3;
    redPlane.shapeColor="red";
    redPlaneGroup.add(redPlane);
 }

 if(frameCount%120==0){
   var rand;
   var xPos = -2
   rand=Math.round(random(0,1));
   var llama= createSprite(xPos,Math.round(random(10,100)),10,10);

   if(rand==0){
    xPos = -5;
    llama.velocityX=3;
   }
    
  else {
    xPos = 705;
    llama.velocityX=-3;
  }
  llama.addImage("llama",llamaimg);
  llama.scale=0.3;
  llamaGroup.add(llama);
} 

if(frameCount%120==0){
  var rand;
  var xPos = -2
  rand=Math.round(random(0,1));
  var bomb= createSprite(xPos,Math.round(random(10,100)),10,10);

  if(rand==0){
   xPos = -5;
   bomb.velocityX=3;
  }
   
 else {
   xPos = 705;
   bomb.velocityX=-3;
 }
 bomb.addImage("bomb",bombimg);
 bomb.scale=0.3;
 bombGroup.add(bomb);
} 

// If yellow player kills red plane=> +2; yellowPlanes=>-1; Llama=>+10; Bomb => -10
if(player.index === 1){
  if(bulletGroup.isTouching(yellowPlaneGroup)){
    player.yellowPlanes +=1;
    yellowPlaneGroup.destroyEach();
  }
  if(bulletGroup.isTouching(redPlaneGroup)){
    player.redPlanes +=1
    redPlaneGroup.destroyEach();
  }
  if(bulletGroup.isTouching(llamaGroup)){
    player.llama +=1
    llamablast.play();
    llamaGroup.destroyEach();
    
  }
  if(bulletGroup.isTouching(bombGroup)){
    player.bomb +=1
    bombblast.play();
    bombGroup.destroyEach();
    
  }
  player.score = (player.yellowPlanes*-1)+(player.redPlanes*2)+(player.llama*10)+(player.bomb*-10);
  //console.log(score);
  player.update();
}



if(player.index === 2){
  if(bulletGroup.isTouching(yellowPlaneGroup)){
    player.yellowPlanes +=1;
    yellowPlaneGroup.destroyEach();
  }
  if(bulletGroup.isTouching(redPlaneGroup)){
    player.redPlanes +=1
    redPlaneGroup.destroyEach();
  }
  if(bulletGroup.isTouching(llamaGroup)){
    player.llama +=1
    llamaGroup.destroyEach();
  }
  if(bulletGroup.isTouching(bombGroup)){
    player.bomb +=1
    bombGroup.destroyEach();
  }
  player.score = (player.yellowPlanes*-1)+(player.redPlanes*2)+(player.llama*10)+(player.bomb*-10);
  console.log(score);
  player.update();
}

   drawSprites();

  }


}

