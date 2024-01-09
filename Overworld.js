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

            // Desenha a camada de baixo
            this.map.drawLowerImage(this.ctx)

            // Desenha os GameObjects - Utiliza o Object.values pois não é um array, é um objeto, transforma em array as propriedades de um objeto
            Object.values(this.map.gameObjects).forEach(object => {
                object.x += 0.03
                object.sprite.draw(this.ctx)
            })

            // Desenha a camada de cima
            this.map.drawUpperImage(this.ctx)

            requestAnimationFrame(() => {
                step()
            })
        }

        step()
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.Kitchen)
        this.startGameLoop()

    }
}