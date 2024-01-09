class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
    }

    init() {
        const image = new Image();
        image.src = "/images/maps/DemoLower.png"

        image.onload = () => {
            this.ctx.drawImage(image, 0, 0)
        }


        const x = 5
        const y = 6

        const shadow = new Image()
        shadow.src = "/images/characters/shadow.png"

        shadow.onload = () => {
            this.ctx.drawImage(
                shadow,   // Objeto da imagem
                0,  // x de inicio do corte (crop)
                0,  // y de inicio do corte (crop)
                32, // largura de corte
                32, // altura de corte
                x * 16 - 8,  // coordenada x
                y * 16 - 18,  // coordenada y
                32, // largura à desenhar
                32  // altura à desenhar;
            )
        }

        const hero = new Image();
        hero.src = "/images/characters/people/hero.png"
        
        hero.onload = () => {
            this.ctx.drawImage(
                hero,   // Objeto da imagem
                0,  // x de inicio do corte (crop)
                0,  // y de inicio do corte (crop)
                32, // largura de corte
                32, // altura de corte
                x * 16 - 8,  // coordenada x
                y * 16 - 18,  // coordenada y
                32, // largura à desenhar
                32  // altura à desenhar;
            )
        }
    }
}