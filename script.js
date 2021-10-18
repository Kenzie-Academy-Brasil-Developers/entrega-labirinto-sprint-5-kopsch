let menuSong = new Audio("./src/doki-theme.mp3")
    menuSong.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
let row
let maze = document.querySelector("#labirinto")
let mazeRow = 9
let mazeColumn = 0
let startGame = document.querySelector(".start-game")
let menuLeft = document.querySelector("#left-menu")
let sayoriSprite = document.querySelector("#sayori-sprite")
let firstCutscene = document.querySelector(".cutscene-begin")
let lastCutscene = document.querySelector(".cutscene-end")
let startMaze =document.querySelector(".start-maze")
const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

let playerPosition = map[mazeRow][mazeColumn]

const createRow = () => {
    row = document.createElement("div")
    row.classList.add("row")
    maze.append(row)
}

const createBlankCell = () => {
    let cell = document.createElement("div")
    cell.classList.add("blank-cell")
    row.append(cell)
    return cell
}

const createWallCell = () => {
    let cell = document.createElement("div")
    cell.classList.add("wall-cell")
    row.append(cell)
    return cell
}

const createBeginCell = () => {
    let cell = document.createElement("div")
    let sayori = document.createElement("img")
    sayori.classList.add("sayori")
    sayori.src = "src/sayori-chibi.png"
    cell.append(sayori)
    cell.classList.add("begin-cell")
    row.append(cell)
    return cell
}

const createEndCell = () => {
    let cell = document.createElement("div")
    let mc = document.createElement("img")
    mc.classList.add("mc")
    mc.src = "src/mc-chibi.png"
    cell.append(mc)
    cell.classList.add("end-cell")
    row.append(cell)
    return cell
}

const makeMaze = () => {
    for(let i = 0; i < map.length; i++){
        let column = map[i]
        createRow()
        for(let j = 0; j < column.length; j++) {
            if(column[j] === " ") {
                createBlankCell()
            }
            if(column[j] === "W") {
                createWallCell()
            }
            if(column[j] === "S") {
                createBeginCell()
            }
            if(column[j] === "F"){
                createEndCell()
            }
        }
    }
}

const movePlayer = {
    topPosition: 350,
    leftPosition: 0,
    ArrowUp: function () {
        if (map[mazeRow - 1][mazeColumn] === " ") {
        this.topPosition -= 40
        document.querySelector(".sayori").style.top = `${this.topPosition}px`
        mazeRow--
        }
    return [mazeColumn, mazeRow]
    },
    ArrowDown: function () {
        if (map[mazeRow + 1][mazeColumn] === " ") {
        this.topPosition += 40
        document.querySelector(".sayori").style.top = `${this.topPosition}px`
        mazeRow++
        }
        return [mazeColumn, mazeRow]
    },
    ArrowRight: function () {
        if (map[mazeRow][mazeColumn + 1] === " " || map[mazeRow][mazeColumn + 1] === "F") {
        this.leftPosition += 40
        document.querySelector(".sayori").style.left = `${this.leftPosition}px`
        mazeColumn++
        }
    return [mazeColumn, mazeRow]
    },
    ArrowLeft: function () {
        if (map[mazeRow][mazeColumn - 1] === " ") {
        this.leftPosition -= 40
        document.querySelector(".sayori").style.left = `${this.leftPosition}px`
        mazeColumn--
        }
    return [mazeColumn, mazeRow]
    }
}

document.addEventListener('keydown', (e) => {
    movePlayer[e.key]()
    if (mazeColumn === 20 && mazeRow === 8) {
        lastCutscene.classList.remove("cutscene-end--hidden")
        maze.classList.add("maze--hidden")
      }
})

makeMaze()


const menuTransition = () => {

    setTimeout(function(){
        menuLeft.classList.remove("left-menu--hidden")
    },500)
    setTimeout(function(){
        sayoriSprite.classList.remove("sayori-sprite--hidden")
    }, 500)
}

menuTransition()

startGame.addEventListener("click", () => {
    menuSong.play()
    let loading = document.querySelector("#loading")
    loading.classList.remove("loading--hidden")
    setTimeout(() => {
        menuLeft.classList.add("hidden")
    sayoriSprite.classList.add("hidden")
    }, 2000)
    setTimeout(() => {
        loading.classList.add("loading--hidden")
        firstCutscene.classList.remove("cutscene-begin--hidden")
    }, 2000)
})

let count = 0;
document.addEventListener('keydown', (e) => {
    count++
    if (e.key === "Enter" && count === 1) {
        firstCutscene.classList.add("cutscene-begin--hidden")
        setTimeout(() => {
            maze.classList.remove("maze--hidden")
        }, 1500)
    }
})

let restartGame = document.querySelector(".restart-maze")
restartGame.addEventListener('click', () => {
    location.reload()
})