
var Ball = Class.create(Sprite, {
  initialize: function (gameObj) {
    Sprite.call(this,25,25);
    this.gameObj = gameObj;
    this.image = gameObj.assets["imgBall"];
    this.active = true;
    this.m_Speed = 400;
    this.m_Velocity = new THREE.Vector2(0,-1);
  },
  initBall : function(){
    this.x = this.gameObj.width * 0.5  - this.width * 0.5;
    this.y = this.gameObj.height - this.height;
    this.y -= this.parentNode.bat.height;
  },
  update: function(delta){
  	if(!this.active)
  		return;
  	this.x += this.m_Speed * this.m_Velocity.x * delta
  	this.y += this.m_Speed * this.m_Velocity.y * delta
  	if(this.x < 0 - this.width)
  		this.m_Velocity.x = 0;
  	if(this.x > 563)
  		this.m_Velocity.x = 0;
  	if(this.y < 0 )
  		this.m_Velocity.y = 1;
  	if(this.y > 460 + this.height)
  		this.m_Velocity.y = -1;

  }
});
