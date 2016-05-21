(function() {
  window.Hanoi = window.Hanoi || {};

  var View = window.Hanoi.View = function (game, $el){
    this.game = game;
    this.$el = $el;
    this.firstClick = this.firstClick || null;
    this.setupTowers();
    this.render();
    this.addListener();
  };

  View.prototype.setupTowers = function(){

    for(var i = 0; i < 3; i++){
      this.$el.append($("<ul><div></div></ul>"));
    };
    var $firstTower = this.$el.find("ul").eq(0);
    for(var i = 0; i <3; i++){
      $firstTower.append($("<li></li>"));
    };

    var $ul = this.$el.find("ul");
    $ul.addClass("towers_grid group");
    var $div = this.$el.find("div");
    $div.addClass("bottom_align");
    var $li = this.$el.find("li");
    $li.eq(0).addClass("small");
    $li.eq(1).addClass("med");
    $li.eq(2).addClass("large");
  };

  View.prototype.render = function(){
    this.$el.find("li").remove();
    var towers = this.game.towers;
    var $ul = this.$el.find("ul");
    for (var i = 0; i < towers.length; i++){
      for(var j = 0; j< towers[i].length; j++){
        if(towers[i][j] === 1){
          $ul.eq(i).append($("<li class='small'></li>"));
        };
        if(towers[i][j] === 2){
          $ul.eq(i).append($("<li class='med'></li>"));
        };
        if(towers[i][j] === 3){
          $ul.eq(i).append($("<li class='large'></li>"));
        };
      };
    };
  };

  View.prototype.clickTower = function(e){
    if(! this.game.isWon()){
      if(this.firstClick === null){
        this.firstClick = $(e.currentTarget).index();
      }else{
        var secondClick = $(e.currentTarget).index();
        if(this.game.isValidMove(this.firstClick, secondClick)){
          this.game.move(this.firstClick, secondClick);
        }else{
          alert("Learn the rules!");
        };
        this.firstClick = null;
      };
      this.render();

      if (this.game.isWon()){
        this.$el.append("<h1>YOU WIN YOU ARE SO SMART!</h1>");
      };
    };

  };

  View.prototype.addListener = function(){
    this.$el.on("click", "ul", this.clickTower.bind(this));
  };
})();

$(document).on("ready", function(){
  var game = new Hanoi.Game ();
  var $el = $(".towers_game");
  var view = new Hanoi.View (game, $el);
});
