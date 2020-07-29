window.onload = main;

const M = 9;
const N = 4;
let matrix = [];
let carCurrentJ = 2;
let algorithm;
let interval = 200;
let carCount = 0;
let keydownCount = 0;
let highScore = [0];
let coordinates = M - 1;
let box = [];
let lines;

function main() {

    createMatrix();
    setCar();
    setLines();

    document.addEventListener("keydown", (e) => {

        if (e.code === 'Space' && keydownCount === 0) {
            setCar();
            keydownCount++;
            document.getElementById("gameOver").innerHTML = "";
            startAlgorithm();
            // startAlgorithm();
            // startAlgorithm();
            // startAlgorithm();
            lines = setInterval(() => {
                moveLines();

            }, interval);



        }

    });
    if (isFinished()){

    }

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
    const table = document.getElementById('matrix');//rename to 'matrix'

    for (let i = 0; i < M; i++) {
        matrix[i] = [];
        let row = document.createElement('tr');
        table.appendChild(row);

        for (let j = 0; j < N + 1; j++) {

            // if (j === 2) {
            let road = document.createElement('td');
            road.id = "road_" + i + j;
            road.className = "road";
            row.appendChild(road);
            // }
            if (j < N) {
                matrix[i][j] = 0;
                let cell = document.createElement('td');
                cell.id = 'cell_' + i + '_' + j;
                cell.className = 'cell';
                row.appendChild(cell);
            }

        }
    }
}

function startAlgorithm() {
    let carBox = ["block", "lamborghini", "bmw"];
    let combination = Math.floor(Math.random() * carBox.length + 1);
    let wallI = 0;
    let randomJ = Math.floor(Math.random() * N);

    algorithm = setInterval(() => {
        let currentBox = play(wallI, randomJ, combination, carBox);
        wallI = currentBox.wallI;
        randomJ = currentBox.randomJ;
        combination = currentBox.combination;
        if (isFinished()) {
            stopGame();
        }
    }, interval);




}

function play(wallI, randomJ, combination, carBox) {


    let back = wallI - 1;
    let cell = 'cell_' + wallI + '_' + randomJ;
    let cellBack = 'cell_' + back + '_' + randomJ;

    if (wallI === 0) {
        document.getElementById(cell).classList.add(carBox[combination]);
    } else {
        matrix[wallI - 1][randomJ] = 0;
        document.getElementById(cell).classList.add(carBox[combination]);// rename
        document.getElementById(cellBack).classList.remove(carBox[combination]);
    }

    if (matrix[wallI][randomJ] === 1) {
        matrix[wallI][randomJ] = 0;
    }

    wallI++;

    if (wallI === M) {
        document.getElementById(cell).classList.remove(carBox[combination]);
        combination = Math.floor(Math.random() * carBox.length);
        randomJ = Math.floor(Math.random() * N);
        wallI = 0;
        carCount++;
        document.getElementById("score").innerHTML = "Score" + " " + carCount;

    }

    if (isFinished()) {
        // clearInterval(lines);

        wallI = 0;
        // clearInterval(algorithm);
       // document.getElementById(cell).classList.remove(carBox[combination]);


    }

    return {
        wallI: wallI,
        randomJ: randomJ,
        combination: combination
    };

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


function setCar() {
    matrix [coordinates][carCurrentJ] = 1;
    let carPictureId = "cell_" + coordinates + "_" + 2;
    document.getElementById(carPictureId).classList.add('car')
}

function stopGame() {
    //clearInterval(lines);
    clearInterval(lines);
    clearInterval(algorithm);
    let carLastPictureId = "cell_" + coordinates + "_" + carCurrentJ;
    if (carCount > highScore[0]) {
        highScore[0] = carCount;
        document.getElementById("highScore").innerHTML = "HighScore" + " " + highScore[0];

    }
    document.getElementById(carLastPictureId).classList.remove('car');
    document.getElementById("gameOver").innerHTML = "Game Over";
    keydownCount = 0;
    carCount = 0;
    carCurrentJ = 2;
    init();
    setCar();


}

function init() {

    for (let i = 0; i < M; i++) {

        for (let j = 0; j < N; j++) {

            let cell = "cell_" + i + "_" + j;
            document.getElementById(cell).classList.add("cell");

        }
    }

}

function setLines() {

    for (let j = 1; j < N; j++) {
        for (let i = 0; i < M; i++) {
            let road = "road_" + i + j;
            if (i % 2 !== 0) {
                document.getElementById(road).classList.add("grey");
                box.push({
                    i: '' + i + j,
                    color: "grey"
                })
            } else {
                document.getElementById(road).classList.remove("grey");
                box.push({
                    i: '' + i + j,
                    color: "white"
                })
            }

        }
    }

}


function moveLines() {
    box.map((obj) => {
        if (obj.color === "grey") {
            let road = "road_" + obj.i;
            document.getElementById(road).classList.remove("grey");
            return obj.color = "white"
        } else {
            let road = "road_" + obj.i;
            document.getElementById(road).classList.add("grey");
            obj.color = "grey";
        }
    },)

}


