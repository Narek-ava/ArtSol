window.onload = main;

const M = 8;
const N = 10;
let matrix = [];
let endPointI;
let endPointJ;

function main() {
    createMatrix();

    document.addEventListener("keydown", function(e) {
        if (e.code === 'Space') {
            startAlgorithm();
            console.log(matrix);
        }
    });

}

function createMatrix() {
    const table = document.getElementById('MATRIX');
    let clickCount = 0;

    for (let i = 0; i < M; i++) {
        matrix[i] = [];
        let row = document.createElement('tr');
        table.appendChild(row);
        for (let j = 0; j < N; j++) {
            matrix[i][j] = 0;
            let cell = document.createElement('td');
            cell.id = 'cell_' + i + '_' + j;
            cell.addEventListener("click", function() {
                let count = clickCount;
                if (count === 0) {
                    matrix[i][j] = 1;
                    this.classList.add('startElement');
                    clickCount++;
                }
                if (count === 1 && matrix[i][j] !== 1) {
                    matrix[i][j] = M * N;
                    endPointI = i;
                    endPointJ = j;
                    this.classList.add('EndElement');
                    clickCount++
                }
                if (count > 1 && matrix[i][j] !== 1 && matrix[i][j] !== M * N) {
                    matrix[i][j] = -1;
                    this.classList.add('Block');
                    clickCount++
                }
            });
              row.appendChild(cell);
        }
    }
}

function startAlgorithm() {
    let currentNumber = 1;

    while (!isFinished(currentNumber)) {
        const boxes = allBoxesEqualTo(currentNumber); // [{i: i, j: j}];

        boxes.forEach((box) => {
            const {i, j} = box;

            initializeNeighbors(i, j,  currentNumber + 1);
        });
        currentNumber++;
    }

    if (isArrived(endPointI, endPointJ)) {
        showShortWay(currentNumber);
    } else {
        return console.error('there is no way to the finish');
    }
}

function allBoxesEqualTo(num) {
    const boxesEqual = [];

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (matrix[i][j] === num) {
                boxesEqual.push({i: i, j: j});
            }
        }
    }

    return boxesEqual;
}

function initializeNeighbors(currentI, currentJ, neighbor) {
    if (isCanPutNeighbor(currentI + 1, currentJ)) {
        matrix[currentI + 1][currentJ] = neighbor;
    }
    if (isCanPutNeighbor(currentI - 1, currentJ)) {
        matrix[currentI - 1][currentJ] = neighbor;
    }
    if (isCanPutNeighbor(currentI, currentJ + 1)) {
        matrix[currentI][currentJ + 1] = neighbor;
    }
    if (isCanPutNeighbor(currentI, currentJ - 1)) {
        matrix[currentI][currentJ - 1] = neighbor;
    }
}

function isCanPutNeighbor(i, j) {
    return isOnMatrix(i, j) && (matrix[i][j] === 0);
}

function isOnMatrix(i, j) {
    return i < M && j >= 0 && i >= 0 && j < N;
}

function isFinished(curNum) {
    return isArrived(endPointI, endPointJ) || isBlocked(curNum);
}


function showShortWay(num) {
    while (num > 1) {
        if (markTheShortWay(num)) {
            num--;
        }
    }
}

function markTheShortWay(currentNum) {
    if (isOnMatrix(endPointI + 1, endPointJ) && (matrix[endPointI + 1][endPointJ] === currentNum)) {
        matrix[endPointI + 1][endPointJ] = '#';
        document.getElementById('cell_' + (endPointI + 1) + '_' + endPointJ).classList.add('step');
        endPointI++;
        return true;
    }
    if (isOnMatrix(endPointI - 1, endPointJ) && (matrix[endPointI - 1][endPointJ] === currentNum)) {
        matrix[endPointI - 1][endPointJ] = '#';
        document.getElementById('cell_' + (endPointI - 1) + '_' + endPointJ).classList.add('step');
        endPointI--;
        return true;
    }
    if (isOnMatrix(endPointI, endPointJ + 1) && (matrix[endPointI][endPointJ + 1] === currentNum)) {
        matrix[endPointI][endPointJ + 1] = '#';
        document.getElementById('cell_' + endPointI + '_' + (endPointJ + 1)).classList.add('step');
        endPointJ++;
        return true;
    }
    if (isOnMatrix(endPointI, endPointJ - 1) && (matrix[endPointI][endPointJ - 1] === currentNum)) {
        matrix[endPointI][endPointJ - 1] = '#';
        document.getElementById('cell_' + (endPointI) + '_' + (endPointJ - 1)).classList.add('step');
        endPointJ--;
        return true;
    }
}

function isBlocked(curNum) {
    let coordinates = allBoxesEqualTo(curNum);
    let bol = true;

    for (let obj of coordinates) {
        let {i, j} = obj;

        if (isCanPutNeighbor(i + 1, j)) {
            bol = false;
            break;
        }
        if (isCanPutNeighbor(i - 1, j)) {
            bol = false;
            break;
        }
        if (isCanPutNeighbor(i, j + 1)) {
            bol = false;
            break;
        }
        if (isCanPutNeighbor(i, j - 1)) {
            bol = false;
            break;
        }
    }

    return bol;
}

function isArrived(i, j) {
    if (isOnMatrix(i + 1, j) && matrix[i + 1][j] > 0) {
        return true;
    }
    if (isOnMatrix(i - 1, j) && matrix[i - 1][j] > 0) {
        return true;
    }
    if (isOnMatrix(i, j + 1) && matrix[i][j + 1] > 0) {
        return true;
    }
    return !!(isOnMatrix(i, j - 1) && matrix[i][j - 1] > 0);
}