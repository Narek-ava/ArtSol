window.onload = main;

const M = 9;
const N = 5;
let matrix = [];
let randomJ = Math.floor(Math.random() * N);
let randomJ2 = Math.floor(Math.random() * N);
let wallI = 0;
let wallI2 = 0;
let carCurrentJ = 2;
let algorithm;
let interval = 200;
let carCount = 0;
let keydownCount = 0;
let highScore = [0];
let coordinates = M - 1;


function main() {

    createMatrix();
    setCar();

    document.addEventListener("keydown", (e) => {

        if (e.code === 'Space' && keydownCount === 0) {
            algorithm = setInterval(() => {
                wallI = startAlgorithm(wallI, randomJ);
                wallI2 = startAlgorithm(wallI2, randomJ2);
                wallI2 = startAlgorithm(wallI2, randomJ2);

                if (isFinished()) {
                    stopGame();
                }
            }, interval);

            keydownCount++;
        }
    });


    document.addEventListener("keydown", function (press) {
        if (keydownCount > 0) {
            if (press.code === "ArrowLeft" && isOnMatrixLeft(carCurrentJ)) {
                moveCarLeft();
            }
            if (press.code === "ArrowRight" && isOnMatrixRight(carCurrentJ)) {
                moveCarRight();
            }
        }
    })
}
function createMatrix() {
    const table = document.getElementById('MATRIX');//rename to 'matrix'

    for (let i = 0; i < M; i++) {
        matrix[i] = [];
        let row = document.createElement('tr');
        table.appendChild(row);

        for (let j = 0; j < N; j++) {
            matrix[i][j] = 0;
            let cell = document.createElement('td');
            cell.id = 'cell_' + i + '_' + j;
            row.appendChild(cell);
        }
    }
}

function startAlgorithm(wallI, randomJ) {
    let back = wallI - 1;
    let cell = 'cell_' + wallI + '_' + randomJ;
    let cellBack = 'cell_' + back + '_' + randomJ;

    if (wallI === 0) {
        document.getElementById(cell).classList.add("Block");
    } else {
        matrix[wallI - 1][randomJ] = 0;
        document.getElementById(cell).classList.add("Block");// rename
        document.getElementById(cellBack).classList.remove("Block");
    }

    if (matrix[wallI][randomJ] === 1) {
        matrix[wallI][randomJ] = 0;
    }

    wallI++;

    if (wallI === M) {
        document.getElementById(cell).classList.remove("Block");
        randomNum(randomJ);
        wallI = 0;
        carCount++;
        document.getElementById("score").innerHTML = "Score" + " " + carCount;

    }

    if (isFinished()) {
        wallI = 0;
    }

    return wallI;

}

function moveCarLeft() {
    let leftMove = carCurrentJ - 1;
    let left = 'cell_' + coordinates + '_' + leftMove;
    let rightDel = 'cell_' + coordinates + '_' + carCurrentJ;

    document.getElementById(left).classList.add('car');
    document.getElementById(rightDel).classList.remove('car');
    matrix[coordinates][leftMove] = 1;
    matrix[coordinates][carCurrentJ] = 0;
    carCurrentJ = leftMove;
}

function moveCarRight() {
    let rightMove = carCurrentJ + 1;
    let right = 'cell_' + coordinates + '_' + rightMove;
    let leftDel = 'cell_' + coordinates + '_' + carCurrentJ;
    document.getElementById(right).classList.add('car');
    document.getElementById(leftDel).classList.remove('car');
    matrix[coordinates][rightMove] = 1;
    matrix[coordinates][carCurrentJ] = 0;
    carCurrentJ = rightMove;
}

function isOnMatrixLeft(carCurrentJ) {
    return carCurrentJ >= 0 && carCurrentJ < 10 && matrix[coordinates][carCurrentJ - 1] === 0;
}

function isOnMatrixRight(carCurrentJ) {
    return carCurrentJ >= 0 && carCurrentJ < 10 && matrix[coordinates][carCurrentJ + 1] === 0;
}

function isFinished() {
    let arr = [];

    for (let j = 0; j < N; j++) {

        if (matrix[coordinates][j] === 0)
            arr.push(0);
    }

    if (arr.length === N) {
        return true;
    }
}

function randomNum(random) {

    if (random === randomJ) {
        return randomJ = Math.floor(Math.random() * N);
    }

    if (random === randomJ2) {
        return randomJ2 = Math.floor(Math.random() * N);
    }
}

function setCar() {
    matrix [coordinates][carCurrentJ] = 1;
    let carPictureId = "cell_" + coordinates + "_" + 2;
    document.getElementById(carPictureId).classList.add('car')
}

function stopGame() {

    clearInterval(algorithm);

    let carLastPictureId = "cell_" + coordinates + "_" + carCurrentJ;
    if (carCount > highScore[0]) {
        highScore[0] = carCount;
        document.getElementById("highScore").innerHTML = "HighScore" + " " + highScore[0];

    }


    keydownCount = 0;
    carCount = 0;
    document.getElementById(carLastPictureId).classList.remove('car');
    carCurrentJ = 2;
    init();
    setCar();
}

function randomComb() {

    return Math.floor(Math.random() * M - 1);

}
function init() {

    for (let i = 0; i < M ; i++) {

        for (let j = 0; j < N ; j++) {

            let cell = "cell_" + i +"_" + j;
            document.getElementById(cell).classList.remove("Block");

        }
    }

}