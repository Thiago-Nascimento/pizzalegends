class Sprite {
    constructor(config) {

        // Define a imagem
        this.image = new Image()
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true
        }

        // Definindo a sombra
        this.shadow = new Image()
        this.useShadow = true

        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png"
        }
        
        this.shadow.onload = () => {
            this.isShadowLoaded = true
        }
        

        // Define a Animação e Estado Inicial
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ]
        }
        this.currentAnimation = config.currentAnimation || "idleDown"
        this.currentAnimationFrame = 0
        
        // Referencia do GameObject
        this.gameObject = config.gameObject
    }

    draw(ctx) {
        const x = this.gameObject.x * 16 - 8
        const y = this.gameObject.y * 16 - 18

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

        this.isLoaded && ctx.drawImage(
            this.image,   // Objeto da imagem
            0,  // x de inicio do corte (crop)
            0,  // y de inicio do corte (crop)
            32, // largura de corte
            32, // altura de corte
            x,  // coordenada x
            y,  // coordenada y
            32, // largura à desenhar
            32  // altura à desenhar;
        )
    }
}