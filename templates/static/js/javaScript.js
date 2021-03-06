var canvasWidth = 600;
var canvasHeight = 400;

var player;
var playerYPosition = 200;

var fallSpeed = 0;
// Se define el intervalo de tiempo para que se muevan las barras del juego
var interval = setInterval(updateCanvas, 30);

var isJumping = false;
var jumpSpeed = 0;

var block;

// Se crea un espacio de inicio
var score = 0;
// Crea una variable para el instanciar 
var scoreLabel;

function startGame() {
    gameCanvas.start();
    player = new createPlayer(30, 30, 10);
    block = new createBlock();
    // Assign your scoreLabel variable a value from scoreLabel()
    scoreLabel = new createScoreLabel(10, 30);
}
 // Esta funcion permite definir dimensiones del juego
var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}
 // Esta funcion permite definir dimensiones del juego
function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;
    
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "aqua";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.makeFall = function() {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            this.stopPlayer();
        }
    }
    /*Funcion donde se establce la terminacion del juego cuando se cumpla cierta instruccion   */
    this.stopPlayer = function() {
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }
    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}

function createBlock() {
    var width = randomNumber(10, 50);
    var height = randomNumber(10, 200);
    var speed = randomNumber(2, 6);
    
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, width, height);
    }
    this.attackPlayer = function() {
        this.x -= speed;
        this.returnToAttackPosition();
    }
    
 // Esta funcion permite crear una posici??n de retorno a ataque que mueva el bloque hacia atr??s
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Increase your score if your block made it to the edge
            score++;
        }
    }
}
/*Funcion que permire detectar si se produce coliciones dentro del juego */
function detectCollision() {
    var playerLeft = player.x
    var playerRight = player.x + player.width;
    var blockLeft = block.x;
    var blockRight = block.x + block.width;
    
    var playerBottom = player.y + player.height;
    var blockTop = block.y;
    
    if (playerRight > blockLeft && 
        playerLeft < blockLeft && 
        playerBottom > blockTop) {
        
        gameCanvas.stop();
    }
}
/*Funcion permite definir el los niveles de avance del juego ademas se puede definir el estilo  */
function createScoreLabel(x, y) {
    this.score = 0;  
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "25px Marker Felt";
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.x, this.y);
    }
}
/*
Esta funcion permite verificar si hay una colisi??n cada vez que actualice el lienzo */

function updateCanvas() {
    detectCollision();
    
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    player.makeFall();
    player.draw();
    player.jump();
    
    block.draw();
    block.attackPlayer();
    
    // Redraw your score and update the value
    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() { resetJump(); }, 1000);
    }
}
