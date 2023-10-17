var canvas;
var backgroundImage;
var bgImg;
var database;
var gameState;
var form, player;
var playerCount=0;
var car1Image;
var car2Image;
var car1;
var car2;
var cars=[];
var trackImage;
var allPlayers;

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1Image = loadImage("./assets/car1.png")
  car2Image = loadImage("./assets/car2.png")
  trackImage = loadImage("./assets/track.jpg")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  console.log("the gamestate is:",gameState)
}

function draw() {
  background(backgroundImage);
  if(playerCount==2){
    game.update(1)
  }
  
  if(gameState==1){
    game.play()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
