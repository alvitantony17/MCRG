class Game {
  constructor() {
    this.resetButton=createButton("")
    this.resetTitle=createElement("h2")
    this.leader1=createElement("h2")
    this.leader2=createElement("h2")
    this.leaderTitle=createElement("h2")
  }
  getState(){
    var gameStateRef=database.ref("gameState")
    gameStateRef.on("value",function(data){
      gameState=data.val()
    })
  }

  update(state){
    database.ref("/").update({
      gameState:state
    })
  }

  test(){
    console.log("test??????????????")
  }

  start() {
    console.log("START")
    form = new Form();
    form.display();
    player = new Player();
    playerCount=player.getCount()
    car1 = createSprite(width/2-50,height - 100)
    car1.addImage("car1Image",car1Image)
    car1.scale=0.07
    car2 = createSprite(width/2+100,height - 100)
    car2.addImage("car2Image",car2Image)
    car2.scale=0.07
    cars=[car1,car2]
  }
  handleElements(){
    form.hide()
    form.titleImg.position(40,50)
    form.titleImg.class("gameTitleAfterEffect")
    this.resetButton.position(width/2+230,100)
    this.resetButton.class("resetButton")
    this.resetTitle.class("resetText")
    this.resetTitle.html("Reset Game")
    this.resetTitle.position(width/2+200,40)

    this.leaderTitle.class("resetText")
    this.leaderTitle.html("Leaderboard")
    this.leaderTitle.position(width/3-60,40)


    this.leader1.position(width/3-50,80)
    this.leader1.class("leadersText")

    this.leader2.position(width/3-50,130)
    this.leader2.class("leadersText")
  }
  
  play(){
    this.handleElements()
    this.handleResetButton()
    Player.getPlayersInfo()
    if(allPlayers != undefined){
      image(trackImage,0,-height*5,width,height*6)
      this.showLeaderBoard()
      var index = 0
      for(var plr in allPlayers){

        index = index + 1
        var x = allPlayers[plr].positionX
        var y = allPlayers[plr].positionY

        cars[index-1].position.x = x
        cars[index-1].position.y = y
        if(index===player.index){
          fill("cyan")
          stroke(10)
          ellipse (x,y,60,60)
          camera.position.y=cars[index-1].position.y
          //camera.position.x=cars[index-1].position.x
        }
        
      }
      this.handlePlayerControls()
      drawSprites()
    }
  } 

  handlePlayerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY -= 10
      player.update()
    }
    if(keyIsDown(DOWN_ARROW)){
      player.positionY += 10
      player.update()
    }
    if(keyIsDown(LEFT_ARROW) && player.positionX>width/4+80){
      player.positionX -= 5
      player.update()
    }
    if(keyIsDown(RIGHT_ARROW) && player.positionX<width/2+300){
      player.positionX += 5
      player.update()
    }
  }

  handleResetButton(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        gameState:0,
        playerCount:0,
        players:{}
      })
      window.location.reload()
    })
    
  }

  showLeaderBoard(){
    var leader1 , leader2
    var players = Object.values(allPlayers)
    if(
      (players[0].rank===0 && players[1]===0 || players[0].rank===1)
    ){
      leader1=
      players[0].rank+
      "&emsp;" +
      players[0].name+
      "&emsp;" +
      players[0].score
      leader2=
      players[1].rank+
      "&emsp;" +
      players[1].name+
      "&emsp;" +
      players[1].score
    }
    if(players[1].rank==1){
      leader1=
      players[1].rank+
      "&emsp;" +
      players[1].name+
      "&emsp;" +
      players[1].score

      leader2=
      players[0].rank+
      "&emsp;" +
      players[0].name+
      "&emsp;" +
      players[0].score
    }
    this.leader1.html(leader1)
    this.leader2.html(leader2)
  }
  
}
