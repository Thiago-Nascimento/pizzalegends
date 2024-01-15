class Person extends GameObject {
    constructor(config) {
        super(config)
        this.movingProgressRemaining = 0

        this.isPlayerControlled = config.isPlayerControlled || false

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition()
        } else {

            // Outras verificações para começar à andar
            
            // Caso: Teclado liberado e tecla de direção pressionada
            if (this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(state)
        }
    }

    startBehavior(state, behavior) {
        // Definindo a direção de acordo com o objeto behavior
        this.direction = behavior.direction
        if (behavior.type === "walk") {
            
            // Se o caminho está bloqueado, para o movimento
            if(state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return
            }
            
            // Move o colisor junto com o objeto do player
            state.map.moveWall(this.x, this.y, this.direction)

            // Permite caminhar
            this.movingProgressRemaining = 16            
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]
        this[property] += change
        this.movingProgressRemaining -= 1

    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction)
            return
        }
        
        this.sprite.setAnimation("idle-" + this.direction)

    }
}