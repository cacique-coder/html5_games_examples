var Brick = Class.create(Sprite, {
  initialize: function (gameObj) {
    Sprite.call(this,64,32);
    this.gameObj = gameObj;
    var randNum = Math.floor(Math.random() * 7);
    var randImage = "imgBrick"+randNum;
    console.log(randImage);
    this.image = gameObj.assets[randImage];
  },
  init : function(position){
    this.x = position.x * this.width + 25;
    this.y = position.y;
  }
});
