const canvas = document.getElementById('jogo')
const ctx = canvas.getContext('2d')
// não usei getters and setter por questão de tempo :P
document.addEventListener ('keydown', function(event) {
    if (event.key === 'D') {
        raquete1.x -= 10
    } else if (event.key === 'A') {
        raquete1.x += 10
    }
})
class Entidade {
    constructor(x, y, largura, altura, cor) {
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.cor = cor
    }
    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Bola extends Entidade {
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor)
        this.velocidadeX
        this.velocidadeY
    }
    atualizar() {
        this.x += this.velocidadeX
        this.y += this.velocidadeY
    }
}




class Raquete extends Entidade {
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor)
    }
    ColisaoBola() {
       
    }
}

class Brick extends Entidade {
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor)
    }
    ColisaoBola() {

    }
}

class Score extends Entidade {
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor)
        this.score
    }
    desenhar() {
        ctx.fillStyle = this.cor
        ctx.font = "italic bold 35pt Tahoma";
        fillText(score, this.x, this.y)
    }
}


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    requestAnimationFrame(loop)
}
loop()