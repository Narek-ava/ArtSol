window.onload = main;

const M = 9;
const N = 4;
let matrix = [];
let carCurrentJ = 2;
let interval = 20;
let carCurrenId ="line_" + carCurrentJ;
//let carCount = 0;
let keydownCount = 0;
//let highScore = [0];
let coordinates = M - 1;
//let box = [];
let lines;
let algorithm;
//let combination;
let algorithm1 = [];
let carBox = ["block", "lamborghini", "bmw"];
let set = 5;
let init = false;
let carLeft = 65;
let leftRightPressCode;


function main() {
    moveCanvas(0);
    setCar();

    // startAlgorithm();
    // createMatrix();
    // setCar();
    // setLines();

    document.addEventListener("keydown", (e) => {
        //init();

        if (e.code === 'Space' && keydownCount === 0) {
            moveCanvas(set);
            keydownCount++;
          //  startAlgorithm();
            // document.getElementById("gameOver").innerHTML = "";
            // let timeoutID = setTimeout(() =>
            //         algorithm1 = algorithmCount(2)
            //     , 2000);

          //  algorithm = algorithmCount(3);

            algorithm1 = setInterval(() => {
                  if (init === false){
                      init = true;
                      startAlgorithm();

                  }

            }, interval);
        }
    });
    //
    document.addEventListener("keydown", function (press) {
        if (keydownCount > 0) {
            leftRightPressCode = press.code;
            if (press.code === "ArrowLeft" ) {
                    moveCar();
            }
            if (press.code === "ArrowRight" ) {
                moveCar();
            }
        }
    })
}

// function createMatrix() {
//     const table = document.getElementById('matrix');//rename to 'matrix'
//
//     for (let i = 0; i < M; i++) {
//         matrix[i] = [];
//         let row = document.createElement('tr');
//         table.appendChild(row);
//
//         for (let j = 0; j < N + 1; j++) {
//             let road = document.createElement('td');
//             road.id = "road_" + i + j;
//             road.className = "road";
//             row.appendChild(road);
//
//             if (j < N) {
//                 matrix[i][j] = 0;
//                 let cell = document.createElement('td');
//                 cell.id = 'cell_' + i + '_' + j;
//                 cell.className = 'cell';
//                 row.appendChild(cell);
//             }
//         }
//     }
// }
//
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
    let parentNode = document.getElementById(lineId);


    algorithm = setInterval(() => {

        top = play();

        // top = obj.top;
        // topCount = obj.topCount;
    }, interval);

    function play() {
        //  let back = wallI - 1;
        // let cell = 'line'+ '_' + randomJ;
        // let cellBack = 'cell_' + back + '_' + randomJ;

        let blockCar = document.getElementById("block_car");
        blockCar.style.top = top + "1px";
        top++;
        if (top > "70") {
            blockCar.style.top = "0px";
            // randomNum = Math.floor(Math.random() * carBox.length);
            // randomLine = Math.floor((Math.random() * 3) + 1);
            div.removeChild(div.childNodes[0]);
            init = false;
            clearInterval(algorithm);

            return 0;
        } else {
            return top;
        }

    }
}

//
function moveCar() {

   let playerCar = document.getElementById("car");
   if (leftRightPressCode === "ArrowRight" && carLeft < 143){
       playerCar.style.left = carLeft + 20 +"px";
       carLeft += 20;
       console.log(carLeft);
   }

   if (leftRightPressCode === "ArrowLeft"  && carLeft > 0){
       playerCar.style.left = carLeft - 20 + "px";
       carLeft -= 20;

   }

}
//
function moveCarRight() {
    let rightMove = carCurrentJ + 1;
    let right = 'line_' + rightMove;
    let leftDel = document.getElementById(carCurrenId);

    let rightCar = document.getElementById(right);
    let rightCarDiv = document.createElement("div");
    rightCarDiv.className = "car";
    rightCar.appendChild(rightCarDiv);
    leftDel.removeChild(leftDel.childNodes[0]);



}

function isOnMatrixLeft(carCurrentJ) {
    return carCurrentJ > 1 ;
}

function isOnMatrixRight(carCurrentJ) {
    return carCurrentJ >= 1 && carCurrentJ < 3;
}
//
// function isFinished() {
//     let arr = [];
//
//     for (let j = 0; j < N; j++) {
//
//         if (matrix[coordinates][j] === 0)
//             arr.push(0);
//     }
//
//     if (arr.length === N) {
//         return true;
//     }
// }
//
//
function setCar() {
    let div = document.getElementById("player_car");
    let playerCar = document.createElement("div");
    playerCar.id = "car";
    div.appendChild(playerCar);

}

//
// function stopGame() {
//
//     let carLastPictureId = "cell_" + coordinates + "_" + carCurrentJ;
//     if (carCount > highScore[0]) {
//         highScore[0] = carCount;
//         document.getElementById("highScore").innerHTML = "HighScore" + " " + highScore[0];
//
//     }
//     document.getElementById(carLastPictureId).classList.remove('car');
//     document.getElementById("gameOver").innerHTML = "Game Over";
//     keydownCount = 0;
//     carCount = 0;
//     carCurrentJ = 2;
//     init();
//     setCar();
// }
//
// function init() {
//
//     for (let i = 0; i < M; i++) {
//
//         for (let j = 0; j < N; j++) {
//
//             let cell = "cell_" + i + "_" + j;
//             document.getElementById(cell).classList.remove("block");
//             document.getElementById(cell).classList.remove( "lamborghini");
//             document.getElementById(cell).classList.remove("bmw");
//         }
//     }
//
// }
//
// function setLines() {
//
//     for (let j = 1; j < N; j++) {
//         for (let i = 0; i < M; i++) {
//             let road = "road_" + i + j;
//             if (i % 2 !== 0) {
//                 document.getElementById(road).classList.add("grey");
//                 box.push({
//                     i: '' + i + j,
//                     color: "grey"
//                 })
//             } else {
//                 document.getElementById(road).classList.remove("grey");
//                 box.push({
//                     i: '' + i + j,
//                     color: "white"
//                 })
//             }
//
//         }
//     }
// }
//
//
// function moveLines() {
//     box.map((obj) => {
//         if (obj.color === "grey") {
//             let road = "road_" + obj.i;
//             document.getElementById(road).classList.remove("grey");
//             obj.color = "white"
//         } else {
//             let road = "road_" + obj.i;
//             document.getElementById(road).classList.add("grey");
//             obj.color = "grey";
//         }
//     },)
// }
//
function algorithmCount(n) {
    let arr = [];
    if (n < N) {
        for (let i = 0; i < n; i++) {
            arr.push(startAlgorithm());

        }
        return arr;
    }
}

//
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
        // context.drawImage(myCar,20,30);
        requestAnimationFrame(gameLoop);
    }
}

// function createCarDiv(carbox) {
//
//    return{
//        id: carDiv.id,
//        lineId: "line_" + randomLine ,
//
//    }
// }
//
// function renameLine() {
//    let randomNum = Math.floor(Math.random()* carBox.length);
//    let randomLine = Math.floor((Math.random()*3)+1);
// }