enchant();
var game;
window.onload = function () {
  game = new Core(500, 350);
  game.fps = 60;
  var assets = {
    "ball": "../enchant/images/icon1.png"
  };
  game.preload(assets);
  game.onload = function () {
    var scene = new Scene();
    scene.backgroundColor = "white";
    var ball = new Ball(game);
    game.pushScene(scene);
    scene.addChild(ball);
  };
  game.start();
};

var Ball = Class.create(Sprite, {
  initialize: function (gameObj) {
    Sprite.call(this, 16, 16);
    this.image = gameObj.assets["ball"];
    this.frame = 0;
    this.m_Speed = 150;
    this.m_VelX = 1.0;
    this.m_VelY = 1.0;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  update: function (evt) {
    if (this.x < 0 || this.x > 500 - this.width) {
      this.m_VelX *= -1;
    }
    if (this.y < 0 || this.y > 350 - this.height) {
      this.m_VelY *= -1;
    }
    this.x += this.m_VelX * this.m_Speed * (evt.elapsed / 1000);
    this.y += this.m_VelY * this.m_Speed * (evt.elapsed / 1000);
  }
});