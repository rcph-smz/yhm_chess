class Board {
    constructor() {
        this.board_wrapper = document.querySelector(".board_wrapper")
        this.pieces_wrapper = document.querySelector(".pieces_wrapper")
        this.squares = this.initialize_squares()
        this.initialize_style()

        // white true, false black
        this.piece_turn = 1
        this.movable_piece = null
        this.movable_active = false
        this.active_tile = null

        this.squares.forEach((square, iSquare) => {
            square.addEventListener("click", (e) => {

                // if(this.piece_turn == square.children[0].getAttribute("data-piece")[0] - 1) console.log("not same")

                if (square.children.length == 1 && this.movable_piece != square.children[0] && !this.movable_active) {
                    this.movable_active = true
                    this.movable_piece = square.children[0]
                    this.active_tile = iSquare
                    square.style.backgroundColor = "lightgreen"
                }
                else if (this.movable_piece == square.children[0]) {

                    this.squares[this.active_tile].style.backgroundColor = this.squares[this.active_tile].getAttribute("data-color")
                    this.movable_active = false
                    this.movable_piece = null
                }
                else if (square.children.length == 1) {

                    this.squares[this.active_tile].style.backgroundColor = this.squares[this.active_tile].getAttribute("data-color")
                    this.removePiece(square.children[0])
                    this.removePiece(this.movable_piece)
                    this.appendPiece(this.movable_piece, iSquare)
                    this.movable_active = false
                    this.movable_piece = null
                    // this.piece_turn = !this.piece_turn
                }
                else if (square.children.length != 1) {
                    this.squares[this.active_tile].style.backgroundColor = this.squares[this.active_tile].getAttribute("data-color")
                    this.removePiece(this.movable_piece)
                    this.appendPiece(this.movable_piece, iSquare)
                    this.movable_active = false
                    this.movable_piece = null
                    // this.piece_turn = !this.piece_turn
                }
            })
        })
    }
    initialize_squares() {
        for (let iSquare = 0; iSquare < 64; ++iSquare) {
            const square = document.createElement("div")
            square.setAttribute("class", "square")
            square.setAttribute("data-iSquare", iSquare)
            // square.addEventListener("click", (e) => {
            //     const coordinate_x = e.target.getBoundingClientRect().left + (e.target.offsetWidth / 2)
            //     const coordinate_y =  e.target.getBoundingClientRect().top + (e.target.offsetHeight / 2)
            // })
            this.board_wrapper.appendChild(square)
        }
        return Array.from(document.querySelectorAll(".square"))
    }
    initialize_style() {
        let shift = 1
        this.squares.forEach((square, sIndex) => {
            if (sIndex % 8 == 0) shift = !shift

            if ((sIndex + shift) % 2 == 0) {
                square.style.backgroundColor = "#eeeed2"
                square.setAttribute("data-color", "#eeeed2")
            }
            else {
                square.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                square.setAttribute("data-color", "rgba(0, 0, 0, 0.5)")
            }
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
        if (this.squares[index].children.length > 0) return
        this.squares[index].appendChild(piece)
    }
    removePiece(piece, index) {
        if (piece) piece.remove()
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
        piece.setAttribute("data-piece", `${empire}${iPieces}`)
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
