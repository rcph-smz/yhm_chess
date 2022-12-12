class Board {
    constructor() {
        this.initialize_style()
    }
    initialize_squares() {
        const board_wrapper = document.querySelector(".board_wrapper")
        for (let iSquare = 0; iSquare < 64; ++iSquare) {
            const square = document.createElement("div")
            square.setAttribute("class", "square")
            board_wrapper.appendChild(square)
        }
        return {
            get() {
                return document.querySelectorAll(".square")
            }
        }
    }
    initialize_style() {
        const squares = this.initialize_squares().get()
        let shift = 1

        squares.forEach((square, sIndex) => {
            if (sIndex % 8 == 0) shift = !shift

            if ((sIndex + shift) % 2 == 0) square.style.backgroundColor = "#eeeed2"
            else square.style.backgroundColor = "#000000"
        })
    }
}
class Pieces {
    constructor() {

    }
    

    initialize_pieces() {

    }
}
const chess = new Board()