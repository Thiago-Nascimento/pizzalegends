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
            // "animation": [ [x,y] ], é um array com a sequencia de frames, cada frame possui x e y referente ao spritesheet
            "idle-down" : [ [0,0] ],
            "idle-right": [ [0,1] ],
            "idle-up"   : [ [0,2] ],
            "idle-left" : [ [0,3] ],
            "walk-down" : [ [1,0], [0,0], [3,0], [0,0] ],
            "walk-right": [ [1,1], [0,1], [3,1], [0,1] ],
            "walk-up"   : [ [1,2], [0,2], [3,2], [0,2] ],
            "walk-left" : [ [1,3], [0,3], [3,3], [0,3] ]
        }

        this.currentAnimation = "walk-down" // config.currentAnimation || "idleDown"
        this.currentAnimationFrame = 0

        this.animationFrameLimit = config.animationFrameLimit || 6   // Tempo (em numero de frames) que o frame ficará em exibição
        this.animationFrameProgress = this.animationFrameLimit        // Progresso para a troca para o próximo frame
        
        // Referencia do GameObject
        this.gameObject = config.gameObject
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key
            this.currentAnimationFrame = 0
            this.animationFrameProgress = this.animationFrameLimit
        }
    }

    updateAnimationProgress() {
        // Decréscimo do progresso da animação
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1
            return
        }

        // Resetar o progresso da animação
        this.animationFrameProgress = this.animationFrameLimit

        // Passa para o próximo frame
        this.currentAnimationFrame += 1

        // Se chegar ao último frame, volta ao frame 0
        if (this.frame === undefined) {
            this.currentAnimationFrame = 0
        }
    }

    draw(ctx) {
        const x = this.gameObject.x - 8
        const y = this.gameObject.y - 18

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

        const [frameX, frameY] = this.frame
        
        this.isLoaded && ctx.drawImage(
            this.image,   // Objeto da imagem
            frameX * 32,  // x de inicio do corte (crop)
            frameY * 32,  // y de inicio do corte (crop)
            32, // largura de corte
            32, // altura de corte
            x,  // coordenada x
            y,  // coordenada y
            32, // largura à desenhar
            32  // altura à desenhar;
        )

        this.updateAnimationProgress()
    }
}