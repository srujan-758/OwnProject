var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var player,game,form;
var bombblast,llamablast,cannonshoot;

var yellowPlane,redPlane


var yellowCannon;
var redCannon;
var cannons=[];

var allPlayers;
var redPlaneGroup, yellowPlaneGroup, llamaGroup, bombGroup;

var score=0;

var llama,bomb;


var yellowCannonimg,redCannonimg,llamaimg,bombimg; 

function preload(){
  yellowCannonimg=loadImage("js/images/yellowCannon.jpg") 
  redCannonimg=loadImage("js/images/redCannon.png") 
  llamaimg=loadImage("js/images/Llama.png")  
  bombimg=loadImage("js/images/Bomb.jpg") 
  bombblast=loadSound("sounds/bombBlast.mp3") 
  llamablast=loadSound("sounds/llamaShoot.mp3") 
  cannonshoot=loadSound("sounds/cannonShoot.mp3") 

}


function setup(){
  canvas = createCanvas(700,500);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
  bulletGroup=createGroup();
  redPlaneGroup = createGroup();
  yellowPlaneGroup = createGroup();
  llamaGroup = createGroup();
  bombGroup=createGroup();

}


function draw(){
background(34,177,76);

 if(playerCount==2){
   game.update(1);
 } 

 if(gameState==1){
   clear();
   game.play();
 }
}
