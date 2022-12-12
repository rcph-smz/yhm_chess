class Board {
    constructor() {
        this.squares = this.initialize_squares()
        this.initialize_style()
    }
    initialize_squares() {
        const board_wrapper = document.querySelector(".board_wrapper")
        for (let iSquare = 0; iSquare < 64; ++iSquare) {
            const square = document.createElement("div")
            square.setAttribute("class", "square")
            square.setAttribute("data-iSquare", iSquare)
            square.addEventListener("pointerdown", (e) => {
                dot(e.target.getBoundingClientRect().left + (e.target.offsetWidth / 2), e.target.getBoundingClientRect().top + (e.target.offsetHeight / 2))
            })
            board_wrapper.appendChild(square)
        }
        return Array.from(document.querySelectorAll(".square"))
    }
    initialize_style() {
        let shift = 1
        this.squares.forEach((square, sIndex) => {
            if (sIndex % 8 == 0) shift = !shift

            if ((sIndex + shift) % 2 == 0) square.style.backgroundColor = "#eeeed2"
            else square.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
        })
    }
    initialize_matrices(matrices) {
        matrices.forEach((position, iSquare) => {
            const square_piece = position.split("")
            const empire = square_piece[0]
            const piece = square_piece[1]
            if (piece == 0 && empire == 0) return

            this.appendPiece(pieces.choose(empire, piece), iSquare)
        })
    }
    appendPiece(piece, index) {
        if (this.squares[index].children.length > 0) this.squares[index].children[0].remove()
        this.squares[index].appendChild(piece)
    }
}
class Pieces {
    constructor() {
        this.defaultMatrices =
            [
                "15", "13", "14", "12", "16", "14", "13", "15",
                "11", "11", "11", "11", "11", "11", "11", "11",
                "00", "00", "00", "00", "00", "00", "00", "00",
                "00", "00", "00", "00", "00", "00", "00", "00",
                "00", "00", "00", "00", "00", "00", "00", "00",
                "00", "00", "00", "00", "00", "00", "00", "00",
                "21", "21", "21", "21", "21", "21", "21", "21",
                "25", "23", "24", "22", "26", "24", "23", "25",
            ]
        this.directory = "assets/resources/alpha"
        this.file_extension = "png"
        this.empire = ["None", "White", "Black"]
        this.pieces = [{ name: "None", abbr: "V", value: 0 }, { name: "Pawn", abbr: "P", value: 1 }, { name: "King", abbr: "K", value: 2 }, { name: "Knight", abbr: "N", value: 3 }, { name: "Bishop", abbr: "B", value: 4 }, { name: "Rook", abbr: "R", value: 5 }, { name: "Queen", abbr: "Q", value: 9 }]
    }
    choose(empire, iPieces) {
        const piece = document.createElement("img")
        piece.setAttribute("class", "piece")
        piece.src = `${this.directory}/${this.empire[empire]}${this.pieces[iPieces].name}.${this.file_extension}`

        return piece
    }
}
class Theme {
    constructor() {

    }
}
const board = new Board()
const pieces = new Pieces()

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}
function dot(x, y) {
    const point = document.createElement("div")
    point.style.cssText = `position:absolute; aspect-ratio: 1/1; width: 10px; background: red; transform: translate(-50%,-50%)`
    point.style.left = `${x}px`
    point.style.top = `${y}px`
    document.body.appendChild(point)
}

board.initialize_matrices(pieces.defaultMatrices)

// setInterval(() => {
//     board.appendPiece(pieces.choose(random(1, 3), random(1, 7)), random(0, 64))
// }, 1000);
