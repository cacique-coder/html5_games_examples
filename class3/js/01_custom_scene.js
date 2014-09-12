enchant();
var game = null;
window.onload = function () {
  game = new Core(500, 350);
  game.fps = 30;
  var assets = {
    "logo": "../enchant/images/enchant.png"
  };
  game.preload(assets);
  game.onload = function () {
    game.pushScene(new MainScene());
    //game.pushScene(new MainScene2(game));
  };
  game.start();
};

var MainScene = Class.create(Scene, {
  initialize: function () {
    Scene.apply(this);
    this.backgroundColor = "white";
    this.m_Logo = new Sprite(512, 512);
    this.m_Logo.image = game.assets["logo"];
    this.m_Logo.originX = 0;
    this.m_Logo.originY = 0;
    this.m_Logo.scaleX = 0.5;
    this.m_Logo.scaleY = 0.5;
    this.addChild(this.m_Logo);
    this.m_Logo.x = this.width * 0.5 - this.m_Logo.width * 0.5 * 0.5;
    this.m_Logo.y = this.height * 0.5 - this.m_Logo.height * 0.5 * 0.5;
  },
});

var MainScene2 = Class.create(Scene, {
  initialize: function (gameObj) {
    Scene.apply(this);
    this.game = gameObj;
    this.backgroundColor = "green";
    this.m_Logo = new Sprite(512, 512);
    this.m_Logo.image = this.game.assets["logo"];
    this.m_Logo.originX = 0;
    this.m_Logo.originY = 0;
    this.m_Logo.scaleX = 0.5;
    this.m_Logo.scaleY = 0.5;
    this.addChild(this.m_Logo);
    this.m_Logo.x = this.width * 0.5 - this.m_Logo.width * 0.5 * 0.5;
    this.m_Logo.y = this.height * 0.5 - this.m_Logo.height * 0.5 * 0.5;
  }
});