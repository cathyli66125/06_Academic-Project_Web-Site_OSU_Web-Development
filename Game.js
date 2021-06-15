var myCar;
var myBombs = [];
var myGasCans = [];
var myMileage;
var myBackground;
var speed;
var upPressed = false;
var downPressed = false;


function startGame() {
    gasLeft = 101;
    speed = 3;
    myMileage = 0;
    myCar = new component(80, 35, "myCar.png", 25, 255, "image");    
    myBackground = new component(800, 400, "background.jpg", 0, 0, "background");
    myBackground2 = new component(800, 400, "background.jpg", 800, 0, "background");
    myScore = new component("10px", "Consolas", "black", 300, 20, "text")
    myGas = new component("10px", "Consolas", "black", 300, 35, "text")
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, 
    stop : function() {
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((myGameArea.framNo / n) % 1 == 0) {return true;}
    return false;
}

function component(width, height, color, x, y, type){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.type = type;
    if (type == "image" || type =="background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.update = function(){
        ctx = myGameArea.context;
        //console.log("speed" + speed);
        if (this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y) ;
        } else if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (type == "background") {
            console.log(this.x + "-" + this.width);
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if (this.x < -(this.width - speed * 5)) {
                this.x = 800;
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height); 
        }    
    }
    this.crash = function(obj) {
        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        var objleft = obj.x;
        var objright = obj.x + obj.width;
        var objtop = obj.y;
        var objbottom = obj.y + obj.height;
        var crash = true;
        if ((mybottom < objtop) || (mytop > objbottom) || (myright < objright) || (myleft > objleft)) {
            crash = false;
        }
        return crash;
    } 
}

function updateGameArea() {
    var x, y;
    myMileage =  Math.floor(myGameArea.frameNo*0.03);
    speed = 3 + myMileage*0.08;
    speedInt = Math.min(Math.floor(50+ 2*speed), 80);
    gasLeft -= myGameArea.frameNo*0.00003;
    gasInt = Math.floor(gasLeft);

    document.getElementById("speed").innerHTML = "SPEED: " + speedInt + "MPH";
    document.getElementById("mileage").innerHTML = "MILEAGE: " + myMileage + "MILES";
    document.getElementById("gas").innerHTML = "GAS: " + gasInt + "%";

    myGameArea.clear();
    myGameArea.frameNo += 1;
    myBackground.x -= speed;
    myBackground.update();
    myBackground2.x -= speed;
    myBackground2.update();
    for (i = 0; i <  myGasCans.length; i += 1) {
        if (myCar.crash(myGasCans[i])) {
          gasLeft = Math.min(101, (gasLeft + 10));
          myGasCans.splice(i,1);
        }
    }    
    if (myGameArea.frameNo%50 == 0) {
        x = myGameArea.canvas.width;
        y = 147 + Math.floor(Math.random() * 10 % 4) * 54;
        myBombs.push(new component(30, 30, "myBomb.png", x, y, "image"));
    } 
    if (myGameArea.frameNo%250 == 175 || myGameArea.frameNo%500 == 125 || myGameArea.frameNo%100 == 10) {
        x = myGameArea.canvas.width;
        y = 147 + Math.floor(Math.random() * 10 % 4) * 54;
        myGasCans.push(new component(30, 30, "myGas.png", x, y, "image"));
    } 
    
    for (i = 0; i < myBombs.length; i += 1) {
        myBombs[i].x += -speed;
        myBombs[i].update();
    }
    for (i = 0; i < myGasCans.length; i += 1) {
        myGasCans[i].x += -speed;
        myGasCans[i].update();
    }
    if(upPressed) {
        moveup();
        upPressed = false;
    }

    if(downPressed) {
        movedown();
        downPressed = false;
    }
    myCar.update();
    for (i = 0; i < myBombs.length; i += 1) {
        if (myCar.crash(myBombs[i]) || gasLeft < 1) {
          myGameArea.stop();
          return;
        }
    }    
}

function movedown() {
    if (myCar.y > 286){
        return;
    }
    myCar.y += 54;
}

function moveup() {
    if (myCar.y < 160){
        return;
    }
    myCar.y -= 54;
}

function keyDownHandler(event) {
    if(event.keyCode == 40) {
    	downPressed = true;
    }
    else if(event.keyCode == 38) {
    	upPressed = true;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
