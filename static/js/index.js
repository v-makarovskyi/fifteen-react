const containerNode = document.getElementById("fifteen");
const itemNodes = Array.from(containerNode.querySelectorAll(".fifteen__item"));
const countItems = 16;

if (itemNodes.length !== 16) {
  throw new Error(`Должно быть ровно ${countItems} элементов в HTML`);
}

/* ---------------------- position ---------------------- */

itemNodes[countItems - 1].style.display = 'none'

const matrix = getMatrix(itemNodes.map((item) => item.dataset.matrixId));
setPositionItems(matrix);


/* ---------------------- shuffle ---------------------- */

/* ---------------------- helpers ---------------------- */

function getMatrix(arr) {
  const matrix = [[], [], [], []];

  let y = 0;
  let x = 0;

  for (let i = 0; i < arr.length; i++) {
    if (x >= 4) {
      y++;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x++;
  }
  return matrix;
}

function setPositionItems(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const value = matrix[y][x];
      const node = itemNodes[value - 1];
      setNodeStyle(node, x, y);
    }
  }
}

function setNodeStyle(node, x, y) {
  const shiftPs = 100;
  node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`;
}

//1. matrix[0][0] = arr[0]
//2. matrix[0][1] = arr[1]
//3 matrix[0][2] = arr[2]
//4 matrix[0][3] = arr[3]
//5 matrix[1][0] = arr[4]
//6 matrix[1][1] = arr[5]
//7 matrix[1][2] = arr[6]
//8 matrix[1][3] = arr[7]
//9 matrix[2][0] = arr[8]
//10 matrix[2][1] = arr[9]
//11 matrix[2][2] = arr[10]
//12 matrix[2][3] = arr[11]
//12 matrix[3][0] = arr[12]
//12 matrix[3][1] = arr[13]
//12 matrix[3][2] = arr[14]
//12 matrix[3][3] = arr[15]
