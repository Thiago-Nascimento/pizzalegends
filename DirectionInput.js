class DirectionInput {
    constructor() {
        this.heldDirections = []

        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right"
        }
    }

    // Getter criado para acesso da tecla atual pressionada, sem acessar o atributo heldDirections, que é privado à classe
    get direction() {
        return this.heldDirections[0]
    }

    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code]

            if (dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir)
                console.log(this.heldDirections);
            }
        })

        document.addEventListener("keyup", e => {
            const dir = this.map[e.code]
            const index = this.heldDirections.indexOf(dir)

            if (index > -1) {
                this.heldDirections.splice(index, 1)
                console.log(this.heldDirections);
            }
        })
    }
}