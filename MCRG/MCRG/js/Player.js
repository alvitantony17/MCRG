class Player {
  constructor() {
    this.name=null
    this.positionX=0
    this.positionY=0
    this.index=null
    this.rank=0
    this.score=0
  }

  addPlayer(){
    var playerIndex="players/player"+this.index
    if(this.index===1){
      this.positionX=width/2-100
      this.positionY = 680
    }
    else{
      this.positionX=width/2+100
      this.positionY = 680
    }
   database.ref(playerIndex).set({
    name:this.name,
    positionX:this.positionX,
    positionY:this.positionY,
    rank:this.rank,
    score:this.score
   })
  }
  
  update(){
    var playerIndex="players/player"+this.index
    database.ref(playerIndex).update({
    positionX:this.positionX,
    positionY:this.positionY,
    rank:this.rank,
    score:this.score
    })
  }

  getCount(){
    var playerCountRef=database.ref("playerCount")
    playerCountRef.on("value",function(data){
      playerCount=data.val()
    })
  }
  updateCount(count){
    database.ref("/").update({
      playerCount:count
    })
  }
  static getPlayersInfo(){
    var playerInfoRef=database.ref("players")
    playerInfoRef.on("value",data=>{
      allPlayers=data.val()
    })
  }
}

