class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
        this.map = null
    }

    startGameLoop() {
        const step = () => {
            // Limpa o canvas antes de desenhar a cada frameUpdate
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            // Estabelece o objeto que a camera irá seguir
            const cameraPerson = this.map.gameObjects.hero

            // Atualiza os objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map
                })
            })
            
            // Desenha a camada de baixo
            this.map.drawLowerImage(this.ctx, cameraPerson)

            // Desenha os GameObjects - Utiliza o Object.values pois não é um array, é um objeto, transforma em array as propriedades de um objeto
            Object.values(this.map.gameObjects).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson)
            })

            // Desenha a camada de cima
            this.map.drawUpperImage(this.ctx, cameraPerson)

            requestAnimationFrame(() => {
                step()
            })
        }

        step()
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
        this.map.mountObjects()

        this.directionInput = new DirectionInput()
        this.directionInput.init()

        this.startGameLoop()

    }
}