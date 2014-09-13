"use strict";
enchant();
window.onload = function () {
  var game = new Core(563, 422);
  var assets = {
    "imgBkg" : "img/bck_Stars.png",
    "imgBall" :"img/spr_Ball_0.png",
    "imgBat" :"img/spr_Bat_0.png"
  };
  var i = 0;
  for(i = 6 ; i >= 0 ; i--){
    assets["imgBrick"+i] = "img/spr_Brick_"+i+".png"
  }
  game.preload(assets);
  game.onload = function () {
    game.fps = 60;
    game.pushScene(new SceneMain(game));
  };
  game.start();
};
