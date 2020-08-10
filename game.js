window.onload = main;

const M = 9;
const N = 4;
let interval = 15;
let keydownCount = 0;
let algorithm;
let algorithm1 = [];
let carBox = ["block", "lamborghini", "bmw"];
let set = 5;
let init = false;
let carLeft = 65;
let leftRightPressCode;
let endOfGame = false;

function main() {
    moveCanvas(0);
    setCar();

    document.addEventListener("keydown", (e) => {

        if (e.code === 'Space' && keydownCount === 0) {
            moveCanvas(set);
            keydownCount++;

            algorithm1 = setInterval(() => {
                if (init === false) {
                    init = true;
                    startAlgorithm();
                }

            }, interval);

            if (endOfGame === true){
                let playerCar = document.getElementById("car");
                carLeft = 65;
                playerCar.style.left = carLeft + "px";
                endOfGame = false;
            }
        }
    });

    document.addEventListener("keydown", function (press) {
        if (keydownCount > 0) {
            leftRightPressCode = press.code;
            if (press.code === "ArrowLeft") {
                moveCar();
            }
            if (press.code === "ArrowRight") {
                moveCar();
            }
        }
    })
}


function startAlgorithm() {

    let randomNum = Math.floor(Math.random() * carBox.length);
    let randomLine = Math.floor((Math.random() * 3) + 1);
    let lineId = "line_" + randomLine;
    let div = document.getElementById(lineId);
    let carDiv = document.createElement("div");
    carDiv.className = carBox[randomNum];
    carDiv.id = "block_car";
    div.appendChild(carDiv);
    let top = "0";

    algorithm = setInterval(() => {
        top = play();
        }, interval);

    function play() {
        let blockCar = document.getElementById("block_car");
        blockCar.style.top = top + "1px";
        top++;
        if (top > "70") {
            blockCar.style.top = "0px";
            div.removeChild(div.childNodes[0]);
            init = false;
            clearInterval(algorithm);
            if (isFinished(lineId)) {
                stopGame();
            }
            return 0;
        } else {
            return top;
        }

    }
}

function moveCar() {

    let playerCar = document.getElementById("car");
    if (leftRightPressCode === "ArrowRight" && carLeft < 143) {
        playerCar.style.left = carLeft + 20 + "px";
        carLeft += 20;
    }

    if (leftRightPressCode === "ArrowLeft" && carLeft > 0) {
        playerCar.style.left = carLeft - 20 + "px";
        carLeft -= 20;

    }

}

function setCar() {
    let div = document.getElementById("player_car");
    let playerCar = document.createElement("div");
    playerCar.id = "car";
    div.appendChild(playerCar);

}

function stopGame() {
    moveCanvas(0);
    clearInterval(algorithm1);
    keydownCount = 0;
    endOfGame = true;
}

function moveCanvas(n) {
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");
    let road = new Image;
    road.src = "./road.png";
    road.onload = () => {
        requestAnimationFrame(gameLoop);
    };

    let yOffset = -512;

    function gameLoop() {
        if (yOffset >= 0) {
            yOffset = -512;
        }
        context.drawImage(road, 0, yOffset);
        context.drawImage(road, 0, yOffset + 512);
        context.drawImage(road, 0, yOffset + 1024);

        yOffset += n;

        requestAnimationFrame(gameLoop);
    }
}

function isFinished(lineTd) {
    if (lineTd === "line_1" && carLeft >= -15 && carLeft <= 45) {
        return true
    }
    if (lineTd === "line_2" && carLeft > 5 && carLeft < 125) {
        return true
    }
    if (lineTd === "line_3" && carLeft > 85 && carLeft <= 145) {
        return true
    }
}