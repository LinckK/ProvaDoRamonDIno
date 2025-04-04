const canvas = document.getElementById('jogo')
const ctx = canvas.getContext('2d')

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

const objeto_na_tela = new Entidade(0, 0, 100, 100, 'red')

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    objeto_na_tela.desenhar()
    requestAnimationFrame(loop)
}
loop()