// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";
heroWidth = 32;

var herowalkReady = false;
var herowalkImage = new Image();
herowalkImage.onload = function () {
	herowalkReady = true;
};
herowalkImage.src = "images/hero-walk.png";

var heroReadyR = false;
var heroImageR = new Image();
heroImageR.onload = function () {
	heroReadyR = true;
};
heroImageR.src = "images/hero-right.png";


var herowalkReadyR = false;
var herowalkImageR = new Image();
herowalkImageR.onload = function () {
	herowalkReadyR = true;
};
herowalkImageR.src = "images/hero-walk-right.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";
monsterWidth = 32;

var monsterwalkReady = false;
var monsterwalkImage = new Image();
monsterwalkImage.onload = function () {
	monsterwalkReady = true;
};
monsterwalkImage.src = "images/monster-walk.png";

var monsterReadyR = false;
var monsterImageR = new Image();
monsterImageR.onload = function () {
	monsterReadyR = true;
};
monsterImageR.src = "images/monster-right.png";


var monsterwalkReadyR = false;
var monsterwalkImageR = new Image();
monsterwalkImageR.onload = function () {
	monsterwalkReadyR = true;
};
monsterwalkImageR.src = "images/monster-walk-right.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {
    speed: 64
};
monstersCaught = 0;
monstersEscaped = 0;

// Handle keyboard controls
var keysDown = {};
var enter = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	enter[e.keyCode] = true;
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	monstersCaught = 0;
	monstersEscaped = 0;
	
};

var noreset = function () {
/*
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
*/

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

var escaped = function () {


	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	monstersEscaped++;
};

//timer
seconds = 30;
gameover = 1;
var updateTime = function(){
    seconds--;
    if(seconds == -1){
        seconds = 30;
        $('.highscore').append(monstersCaught + '<br>');
        $('#newgame').show();
        $('#displayhigh').html(monstersCaught);
        clearInterval(startTimer);
        gameover = 1;
        
    }
};

$(document).ready(function(){
    $('#newgame').click(function(){
        $(this).hide();
        reset();
        startTimer = setInterval(updateTime, 1000);
    });
});






walkAbout = function(){
    if(walkrate == 1){
        if(walk == 1){
            walk = 0;
        }
        else{
            walk = 1;
        }
        
    }
    

   
};
walkrate = 0;
heroRight = 0;
monsterRight = 0;
// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
		if(hero.y > monster.y){
		  monster.y -= monster.speed * modifier;
		}
		if(hero.y < monster.y){
		  monster.y += monster.speed * modifier;
		}
		
		walkAbout();
		walkrate++;
		if(walkrate >= 50){
    		walkrate = 1;
		}
		
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
		if(hero.y > monster.y){
		  monster.y -= monster.speed * modifier;
		}
		if(hero.y < monster.y){
		  monster.y += monster.speed * modifier;
		}
		walkAbout();
		walkrate++;
		if(walkrate >= 50){
    		walkrate = 0;
		}

	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		if(hero.x > monster.x){
		  monster.x -= monster.speed * modifier;
		  monsterRight = 0;
		}
		if(hero.x < monster.x){
		  monster.x += monster.speed * modifier;
		  monsterRight = 1;
		}
		walkAbout();
		walkrate++;
		if(walkrate >= 50){
    		walkrate = 0;
		}
		heroRight = 0;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		if(hero.x > monster.x){
		  monster.x -= monster.speed * modifier;
		  monsterRight = 0;
		}
		if(hero.x < monster.x){
		  monster.x += monster.speed * modifier;
		  monsterRight = 1;
		}
		walkAbout();
		walkrate++;
		if(walkrate >= 50){
    		walkrate = 1;
		}
		heroRight = 1;
	}
	
	if (13 in enter) {
	   if(gameover == 1){
    	   $('#newgame').hide();
    	   reset();
    	   startTimer = setInterval(updateTime, 1000);
    	   gameover = 0;
	   }
	   
        enter = {};
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + heroWidth)
		&& monster.x <= (hero.x + heroWidth)
		&& hero.y <= (monster.y + monsterWidth)
		&& monster.y <= (hero.y + heroWidth)
	) {
		++monstersCaught;
		
		noreset();
	}
	
	/* hero collision detection */
	if (hero.x < (-heroWidth)) {
    	hero.x = canvas.width + heroWidth;
	}
	if (hero.x > (canvas.width + heroWidth)) {
    	hero.x = (-heroWidth);
	}
	if (hero.y < (-heroWidth)) {
    	hero.y = canvas.height + heroWidth;
	}
	if (hero.y > (canvas.height + heroWidth)) {
    	hero.y = (-heroWidth);
	}
	
	/* monster collision detection */
	if (monster.x < (-monsterWidth)) {
    	escaped();
	}
	if (monster.x > (canvas.width + monsterWidth)) {
    	escaped();
	}
	if (monster.y < (-monsterWidth)) {
    	escaped();
	}
	if (monster.y > (canvas.height + monsterWidth)) {
    	escaped();
	}

};


walk = 0;
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if(heroRight == 1){
    	if(walk == 1){
            if (herowalkReadyR) {
    		  ctx.drawImage(herowalkImageR, hero.x, hero.y);
            }
    	
        }
        if(walk == 0){
            if (heroReadyR) {
    		  ctx.drawImage(heroImageR, hero.x, hero.y);
            }
    	
        }
	}
	if(heroRight == 0){
        if(walk == 1){
            if (herowalkReady) {
    		  ctx.drawImage(herowalkImage, hero.x, hero.y);
            }
    	
        }
        if(walk == 0){
            if (heroReady) {
    		  ctx.drawImage(heroImage, hero.x, hero.y);
            }
    	
        }
	}

	

	if(monsterRight == 1){
    	if(walk == 1){
            if (monsterwalkReadyR) {
    		  ctx.drawImage(monsterwalkImageR, monster.x, monster.y);
            }
    	
        }
        if(walk == 0){
            if (monsterReadyR) {
    		  ctx.drawImage(monsterImageR, monster.x, monster.y);
            }
    	
        }
	}
	if(monsterRight == 0){
        if(walk == 1){
            if (monsterwalkReady) {
    		  ctx.drawImage(monsterwalkImage, monster.x, monster.y);
            }
    	
        }
        if(walk == 0){
            if (monsterReady) {
    		  ctx.drawImage(monsterImage, monster.x, monster.y);
            }
    	
        }
	}
	

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "16px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Victims Caught: " + monstersCaught + "    Victims Escaped: " + monstersEscaped + "    Time Left :" + seconds, 32, 32 );
};


// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!

var then = Date.now();
setInterval(main, 1); // Execute as fast as possible


