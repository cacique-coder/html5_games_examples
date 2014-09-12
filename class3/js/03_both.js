enchant();
window.onload = function () {
  var game = new Core(440, 700);
  var assets = {
    "imgPlayerShip": "img/playerShip2_green.png",
    "imgEnemyShip": "img/enemyBlack2.png",
    "imgLaserGreen": "img/laserGreen04.png",
    "imgLaserRed": "img/laserRed02.png",
    "imgBackground": "img/space.png"
  };
  game.preload(assets);
  game.onload = function () {
    game.fps = 60;
    game.pushScene(new SceneMain(game));
  };
  game.start();
};

var SceneMain = Class.create(Scene, {
  initialize: function (gameObj) {
    Scene.apply(this);
    this.m_Game = gameObj;
    var background = new Sprite(450, 720);
    background.image = this.m_Game.assets["imgBackground"];
    this.addChild(background);
    this.m_Player = new Player(this.m_Game);
    this.addChild(this.m_Player);
    this.m_LasersPlayerNum = 3;
    this.m_LasersPlayerLeft = 3;
    this.m_LasersPlayer = new Array(this.m_LasersPlayerNum);
    for (var i = 0; i < this.m_LasersPlayerNum; i++) {
      this.m_LasersPlayer[i] = new Laser(this.m_Game, "green");
      this.addChild(this.m_LasersPlayer[i]);
    }
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  update: function (evt) {
    var deltaTime = evt.elapsed / 1000;
    this.m_Player.update(deltaTime);
    for (var i = 0; i < this.m_LasersPlayerNum; i++) {
      this.m_LasersPlayer[i].update(deltaTime);
    }
  },
  shootLaser: function (color, x) {
    if (color === "green") {
      if (this.m_LasersPlayerLeft > 0) {
        this.m_LasersPlayerLeft--;
        for (var i = 0; i < this.m_LasersPlayerNum; i++) {
          if (!this.m_LasersPlayer[i].m_Alive) {
            var y = this.m_Game.height;
            y -= this.m_Player.height;
            this.m_LasersPlayer[i].shoot(x, y);
            break;
          }
        }
      }
    }
  }
});

var Player = Class.create(Sprite, {
  initialize: function (gameObj) {
    Sprite.call(this, 112, 75);
    this.m_Game = gameObj;
    this.image = this.m_Game.assets["imgPlayerShip"];
    this.x = this.m_Game.width * 0.5 - this.width * 0.5;
    this.y = this.m_Game.height - this.height;
    this.addEventListener(Event.TOUCH_START, this.touchStart);
    this.addEventListener(Event.TOUCH_MOVE, this.touchMove);
  },
  update: function (deltaTime) {
    var centerX = this.x + this.width * 0.5;
    if (centerX > this.m_Game.width) {
      this.x = this.m_Game.width - this.width * 0.5;
    }
    if (centerX < 0) {
      this.x = this.width * 0.5;
    }
  },
  touchStart: function (evt) {
    this.x = evt.x - this.width * 0.5;
    this.parentNode.shootLaser("green", evt.x);
  },
  touchMove: function (evt) {
    this.x = evt.x - this.width * 0.5;
  }
});

var Laser = Class.create(Sprite, {
  initialize: function (gameObj, color) {
    Sprite.call(this, 13, 37);
    this.m_Game = gameObj;
    this.m_Color = color;
    this.m_Alive = false;
    this.m_Speed = 500;
    this.m_VelY = -1.0;
    var png;
    if (this.m_Color === "green") {
      png = this.m_Game.assets["imgLaserGreen"];
    } else {
      this.m_VelY = 1.0;
      png = this.m_Game.assets["imgLaserRed"];
    }
    this.image = png;
  },
  shoot: function (x, y) {
    this.x = x - this.width * 0.5;
    this.y = y;
    this.m_Alive = true;
  },
  update: function (deltaTime) {
    if (this.m_Alive) {
      this.y += this.m_VelY * this.m_Speed * deltaTime;
      if (this.m_Color === "green") {
        if (this.y <= 0) {
          this.m_Alive = false;
          this.parentNode.m_LasersPlayerLeft++;
        }
      } else {
        if (this.y >= this.m_Game.height) {
          this.m_Alive = false;
          this.parentNode.m_LasersPlayerLeft++;
        }
      }
    } else {
      this.x = -1000;
      this.y = -1000;
    }
  }
});