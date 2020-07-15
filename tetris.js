window.onload = main;

const M = 10;
const N = 5;
let matrix = [];
let randomJ =  Math.floor(Math.random() * N);
let randomJ2 =  Math.floor(Math.random() * N);
let wallI = 0;
let wallI2 = 0;
let carCurrentJ = 2;
let algorithm ;
let algorithm2 ;
let carCount = 0 ;
let keydownCount = 0
console.log(randomJ);
function main() {
    createMatrix();
    console.log(matrix);
    setCar();
if (keydownCount === 0) {
    document.addEventListener("keydown", (e) => {
        keydownCount++;
        if (e.code === 'Space') {
            algorithm = setInterval(() => {
                startAlgorithm();
                startAlgorithm2();

                if (isFinished()) {
                    stopGame(algorithm);
                }

            }, 150);
            algorithm2 = setInterval(() => {
                startAlgorithm2();

                if (isFinished()) {
                    stopGame(algorithm2);
                }
            }, 150)
        }

    });
}

    document.addEventListener("keydown", function(press){

        if(press.code === "ArrowLeft" && isOnMatrixLeft(carCurrentJ)) {
            moveCarLeft();
        }
        if (press.code === "ArrowRight" && isOnMatrixRight(carCurrentJ)){
            moveCarRight();
        }
    })

}

function createMatrix() {
    const table = document.getElementById('MATRIX');


    for (let i = 0; i < M; i++) {
        matrix[i] = [];
        let row = document.createElement('tr');
        table.appendChild(row);
        for (let j = 0; j < N; j++) {
            matrix[i][j] = 0;
            let cell = document.createElement('td');
            cell.id = 'cell_' + i + '_' + j;
            // if (j === 2) {
            //     document.getElementById(cell.id).classList.add("road2");
            //     // console.log(cell.id);
            // }
            row.appendChild(cell);
        }
    }
}

function startAlgorithm() {

        let back = wallI - 1;
        let cell = 'cell_' + wallI + '_'+ randomJ;
        let cellBack = 'cell_' + back + '_'+ randomJ;
        if(wallI === 0){


            document.getElementById(cell).classList.add("Block");
        }else{
           matrix[wallI - 1][randomJ] = 0;
           document.getElementById(cell).classList.add("Block");
            document.getElementById(cellBack).classList.remove("Block");

        }
        if(matrix[wallI][randomJ] === 1){
            matrix[wallI][randomJ] = 0;
        }
    wallI++;
    if(wallI === 10){
        document.getElementById(cell).classList.remove("Block");
        randomJ = randomNum();
        wallI = 0;
        carCount++;
        document.getElementById("score").innerHTML = carCount;
       }

    }
function startAlgorithm2() {

    let back = wallI2 - 1;
    let cell = 'cell_' + wallI2 + '_'+ randomJ2;
    let cellBack = 'cell_' + back + '_'+ randomJ2;
    if(wallI2 === 0){


        document.getElementById(cell).classList.add("Block");
    }else{
        matrix[wallI2 - 1][randomJ] = 0;
        document.getElementById(cell).classList.add("Block");
        document.getElementById(cellBack).classList.remove("Block");

    }
    if(matrix[wallI2][randomJ2] === 1){
        matrix[wallI2][randomJ2] = 0;
    }
    wallI2++;
    if(wallI2 === 10){
        document.getElementById(cell).classList.remove("Block");
        randomJ2 = randomNum();
        wallI2 = 0;
        carCount++;
        document.getElementById("sccore").value = carCount;
    }

}

function moveCarLeft(){
    let leftMove = carCurrentJ - 1;
    let left = 'cell_'+ 9 +'_'+ leftMove ;
    let rightDel = 'cell_'+ 9 +'_'+ carCurrentJ ;
    document.getElementById(left).classList.add('car');

    document.getElementById(rightDel).classList.remove('car');
    matrix[9][leftMove] = 1;
    matrix[9][carCurrentJ] = 0;
    carCurrentJ = leftMove;
   // console.log(matrix);
}

function moveCarRight(){
    let rightMove = carCurrentJ + 1;
    let right = 'cell_'+ 9 +'_'+ rightMove ;
    let leftDel = 'cell_'+ 9 +'_'+ carCurrentJ ;
    document.getElementById(right).classList.add('car');
    //console.log(matrix)
    document.getElementById(leftDel).classList.remove('car');
    matrix[9][rightMove] = 1;
    matrix[9][carCurrentJ] = 0;
    carCurrentJ = rightMove;
  //  console.log(matrix);
}


function isOnMatrixLeft(carCurrentJ) {

    return carCurrentJ >=0 && carCurrentJ < 10 && matrix[9][carCurrentJ - 1] === 0;
}
function isOnMatrixRight(carCurrentJ) {

    return carCurrentJ >=0 && carCurrentJ < 10 && matrix[9][carCurrentJ + 1] === 0;
}

function isFinished() {
    let i = 9;
    let arr = []
    for (let j = 0; j < N ; j++) {
        if(matrix[i][j] === 0)
            arr.push(0);
    }
      if (arr.length === N){
          return true;
      }
    }


 function setCar() {
    matrix [9][carCurrentJ] = 1;
    document.getElementById("cell_9_2").classList.add('car')
 }

 function randomNum(){
    return Math.floor(Math.random() * N);

 }
 function stopGame(){
     clearInterval(algorithm);
     clearInterval(algorithm2);
     keydownCount = 0;
 }
function setLines(){
    for (let i = 0; i < M ; i++) {
        for (let j = 0; j < N ; j++) {
            if (j === 2){

            }
        }
    }
}