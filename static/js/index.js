const containerNodes = document.getElementById('fifteen')
const itemsNodes = Array.from(containerNodes.querySelectorAll('.item'))
const countItemsNodes = 16



/* Position */
let matrix = getMatrix(itemsNodes.map((item) => Number(item.dataset.matrixId)))
setPositionItems(matrix)
itemsNodes[countItemsNodes - 1].style.display = 'none' /* скрыть 16-й элемент */


/* Shuffle */
document.getElementById('shuffle').addEventListener('click', () => {
    const shuffledArr = shuffledArray(matrix.flat())
    matrix = getMatrix(shuffledArr)
    setPositionItems(matrix)
})
/* Handle change position by click */
const blankNumber = 16
containerNodes.addEventListener('click', (event) => {
    const buttonNode = event.target.closest('button')
    if(!buttonNode) {
        return
    }
    const buttonNumber = Number(buttonNode.dataset.matrixId)
    const buttonCoords = findCoordsByNymber(buttonNumber, matrix)
    const blankCoords = findCoordsByNymber(blankNumber, matrix)
    
    console.log(buttonCoords)
    console.log(blankCoords)

    const isValid = isValidForSwap(buttonCoords, blankCoords)
    console.log(isValid)
    /* isValid(valid) {

    } */
})

/* Handle change position by kewdown */

/** HELPERS**/
function getMatrix(arr) {
    let matrix = [[], [], [], []]
    let y = 0
    let x = 0
    for(let i = 0; i < arr.length; i++) {
        if(x >= 4) {
            y++
            x = 0
        }
        matrix[y][x] = arr[i]
        x++
    }
    return matrix
}

function setPositionItems(matrix) {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x]
            const node = itemsNodes[value - 1]
            setNodesStyles(node, x, y)
        }
    }
}

function setNodesStyles(node, x, y) {
    const shiftPs = 100
    node.style.transform = `translate3D(${x*shiftPs}%, ${y*shiftPs}%, 0)`
}

function shuffledArray(arr) {
    return arr
        .map(value => ({value, sort: Math.random()}))
        .sort((a,b) => a.sort - b.sort)
        .map(({value}) => value)
}

function findCoordsByNymber(number, matrix) {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] === number) {
                return {x, y}
            }

        }
    }
    return null
}

function isValidForSwap(coords1, coords2) {
    const diffX = Math.abs(coords1.x - coords2.x)
    const diffY = Math.abs(coords1.y - coords2.y)

    return (diffX === 1 || diffY ===1) && (coords1.x === coords2.x || coords1.y === coords2.y)
}
