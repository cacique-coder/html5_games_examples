"use strict";
var SceneMain = Class.create(Scene, {
  initialize: function (gameObj) {
    Scene.apply(this);
    this.gameObj = gameObj;
    this.create_elements();
    this.events();
  },
  events: function(){
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  create_elements: function(){
    var background = new Sprite(563, 422);
    background.image = this.gameObj.assets["imgBkg"];
    this.addChild(background);

    this.bat = new Bat(this.gameObj);
    this.addChild(this.bat);

    this.ball = new Ball(this.gameObj,this.bat);
    this.addChild(this.ball);
    this.ball.initBall();

    this.bricks();
  },
  bricks : function(){
    var number = 7;
    var brick;
    this.bricks = [];
    for(;number >=0 ; number--){
      brick = new Brick(this.gameObj);
      brick.init({x:number,y:0});
      this.addChild(brick);
      this.bricks.push(brick)
    }
  },
  update: function (evt) {
    var deltaTime = evt.elapsed / 1000;
    this.ball.update(deltaTime);
    this.review_collisions();
  },
  review_collisions : function(){
    var ball = this.ball;
    var brick = undefined;
    var num_bricks = this.bricks.length -1;
    var isCollision = false;
    for (var i = num_bricks; i >= 0; i--) {
      brick = this.bricks[i];
      if (ball.intersect(brick)){
        this.removeChild(brick);
        this.bricks.splice(i,1);
        isCollision = true;
      }
    }
    if(ball.intersect(this.bat)){
      isCollision = true;
    }

    if(isCollision)
      ball.m_Velocity.y *= -1;
  }
});