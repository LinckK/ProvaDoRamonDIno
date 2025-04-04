const canvas = document.getElementById('jogo')
canvas.width = 800
canvas.height = 400
const ctx = canvas.getContext('2d')

let velocidadeX = 0
let score = 0
let array = 


document.addEventListener('keydown', function(event) { 
    if (event.key === 'a') {
        velocidadeX = -10
    } else if (event.key === 'd') {
        velocidadeX = 10
    }
})

document.addEventListener('keyup', function(event) { 
    if (event.key === 'a' || event.key === 'd') {
        velocidadeX = 0
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
        this.velocidadeX = 3
        this.velocidadeY = 4
    }
    atualizar() {
        this.x += this.velocidadeX
        this.y += this.velocidadeY
    }
    verificarColisao(entidade) {
        if (entidade.x < this.x + this.largura && 
            entidade.x + entidade.largura > this.x &&
            entidade.y < this.y + this.altura && 
            entidade.y + entidade.altura > this.y || 0 >= this.y) {
            this.velocidadeY = -this.velocidadeY
        }
        if (this.x < 0 || this.x + this.largura > canvas.width) {
            this.velocidadeX = -this.velocidadeX
        }
        if (this.y >= canvas.height){
            alert("Perdeu de F5 para jogar de novo")
        }
    }
}

class Raquete extends Entidade {
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor)
    }
    atualizar() {
        this.x += velocidadeX
        if (this.x < 0) {
            this.x = 0
        } else if (this.x + this.largura > canvas.width) {
            this.x = canvas.width - this.largura
        }
    }
}

class Brick extends Entidade {
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor)
    }
    verificarColisao(bola) {
        return (
            this.x < bola.x + bola.largura &&
            this.x + this.largura > bola.x &&
            this.y < bola.y + bola.altura &&
            this.y + this.altura > bola.y
        )
    }
    static desenharEColidirTodos(lista, bola) {
        for (let i = lista.length - 1; i >= 0; i--) {
            const brick = lista[i]
            if (brick.verificarColisao(bola)) {
                lista.splice(i, 1)
                bola.velocidadeY = -bola.velocidadeY
                score += 1
                continue
            }
            brick.desenhar()
        }
    }
}

function gerarBricks(qtdLinhas, yInicial) {
    const bricks = []
    const margem = 5
    const altura = 12
    const cores = ['red', 'green', 'blue', 'yellow', 'purple', 'orange']
    for (let linha = 0; linha < qtdLinhas; linha++) {
        let x = Math.floor(Math.random() * 80)
        while (x < canvas.width - 80) {
            let largura = Math.floor(Math.random() * 21) + 80
            if (x + largura > canvas.width) break
            let cor = cores[Math.floor(Math.random() * cores.length)]
            bricks.push(new Brick(x, yInicial + linha * (altura + margem), largura, altura, cor))
            x += largura + margem
        }
    }
    return bricks
}
class Score {
    constructor(){
    }
    desenhar(score){
    ctx.fillStyle = 'white'
    ctx.font = '20px Arial'
    ctx.fillText("Score: " + score, 10, 25)
    }
}


const bola = new Bola(400, 150, 10, 10, 'white')
const raquete1 = new Raquete(350, 370, 100, 10, 'blue')
const bricks = gerarBricks(5, 30)
const score1 = new Score()

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bola.atualizar()
    bola.verificarColisao(raquete1)
    raquete1.atualizar()
    Brick.desenharEColidirTodos(bricks, bola)
    bola.desenhar()
    raquete1.desenhar()
    score1.desenhar(score)
    requestAnimationFrame(loop)
}
loop()
