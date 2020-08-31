window.onload = main;

const M = 8;
const matrix = [];
let currentI = 0;
let currentJ = 0;

function main() {
    createMatrix();
    initializeMatrix();
    putHorse();

    while (!isFinished()) {
        initializeMatrix();
        moveHorse();
    }

    console.log(matrix);
}

function createMatrix() {
    const board = document.getElementById('board');
    let table = document.createElement('table');
    board.appendChild(table);

    for (let i = 0; i < M; i++) {
        const ROW = document.createElement('tr');
        matrix[i] = [];
        table.appendChild(ROW);
        for (let j = 0; j < M; j++) {
            const CELL = document.createElement('td');
            CELL.id = 'CELL_' + i + '_' + j;
            isElementPairOrNot(i , j, CELL);
            ROW.appendChild(CELL);
        }
    }
}

function isElementPairOrNot(i , j, CELL) {
    if (i % 2 === 0) {
        if (j % 2 !== 0) {
            CELL.style.backgroundColor = 'black';
            matrix[i][j] = 0;
        } else {
            CELL.style.backgroundColor = 'white';
            matrix[i][j] = 0;
        }

    } else {
        if (j % 2 !== 0) {
            CELL.style.backgroundColor = 'white';
            matrix[i][j] = 0;
        } else {
            CELL.style.backgroundColor = 'black';
            matrix[i][j] = 0;
        }
    }
}

function initializeMatrix() {
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < M; j++) {
            if (matrix[i][j] !== -1) {
                matrix[i][j] = getAvailableBoxes(i, j).length;
            }
        }
    }
}

function getAvailableBoxes(i, j) {
    let availableBox = [];

    if (canMove(i + 1, j + 2)) {
        availableBox.push({i: i + 1, j: j + 2});
    }
    if (canMove(i + 1, j - 2)) {
        availableBox.push({i: i + 1, j: j - 2});
    }
    if (canMove(i + 2, j + 1)) {
        availableBox.push({i: i + 2, j: j + 1});
    }
    if (canMove(i + 2, j - 1)) {
        availableBox.push({i: i + 2, j: j - 1});
    }
    if (canMove(i - 1, j + 2)) {
        availableBox.push({i: i - 1, j: j + 2});
    }
    if (canMove(i - 1, j - 2)) {
        availableBox.push({i: i - 1, j: j - 2});
    }
    if (canMove(i - 2, j + 1)) {
        availableBox.push({i: i - 2, j: j + 1});
    }
    if (canMove(i - 2, j - 1)) {
        availableBox.push({i: i - 2, j: j - 1});
    }

    return availableBox;
}

function canMove(i , j) {
    return i >= 0 && j >= 0 && i < M && j < M && matrix[i][j] !== -1;
}

function putHorse() {
    matrix[currentI][currentJ] = -1;
    document.getElementById('CELL_' + currentI + '_' + currentJ).classList.add('horse');
}

function moveHorse() {
    let minValue = M;

    getAvailableBoxes(currentI, currentJ).forEach((obj) => {
        if (minValue > matrix[obj.i][obj.j]) {
            minValue = matrix[obj.i][obj.j];
            currentI = obj.i;
            currentJ = obj.j;
        }
    });

    putHorse();
}

function isFinished() {
    for (let arr of matrix) {
        for (let el of arr) {
            if (el !== -1) {
                return false;
            }
        }
    }
    return true;
}