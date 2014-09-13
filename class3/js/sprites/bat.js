
var Bat = Class.create(Sprite, {
  initialize: function (gameObj) {
    Sprite.call(this,96,32);
    this.gameObj = gameObj;
    this.image = gameObj.assets["imgBat"];
    this.x = gameObj.width * 0.5  - this.width * 0.5;
    this.y =  gameObj.height - this.height;
    this.on(Event.TOUCH_MOVE,this.touchMove);
    this.on("onkeypress",function(){
    	console.log(arguments);
    });
  },

  touchMove:function(evt){
  	this.x = evt.x - this.width * 0.5;
  	var ball = this.parentNode.ball;
	if(!ball.active){
	    ball.x = this.x + ((this.width - ball.width) >> 1) ;    
        ball.y = this.gameObj.height - ball.height - this.height;
	}
  }
});
