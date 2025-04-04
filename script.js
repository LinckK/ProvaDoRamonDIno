const canvas = document.getElementById('jogo')
const ctx = canvas.getContext('2d')

let velocidadeX = 0
document.addEventListener('keydown', function(event) { 
    if (event.key === 'a') {
        velocidadeX = -10;  
    } else if (event.key === 'd') {
        velocidadeX = 10;   
    }
});

document.addEventListener('keyup', function(event) { 
    if (event.key === 'a' || event.key === 'd') {
        velocidadeX = 0;  
    }
});



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
            entidade.y + entidade.altura > this.y || 0 >=  this.y  ) {
            this.velocidadeY = -this.velocidadeY;
        }
        if (this.x < 0 || this.x + this.largura > canvas.width) {
            this.velocidadeX = -this.velocidadeX;
        }
        console.log(canvas.width)
        console.log(this.x)

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
}

class Score extends Entidade {
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor)
        this.score = 0
    }
    desenhar() {
        ctx.fillStyle = this.cor
        ctx.font = "italic bold 35pt Tahoma";
        ctx.fillText(this.score, this.x, this.y)
    }
}

const bola = new Bola(300, 100, 10, 10, 'white')
const raquete1 = new Raquete(500, 370, 100, 10, 'blue')

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bola.atualizar()
    bola.verificarColisao(raquete1)
    raquete1.atualizar()
    bola.desenhar()
    raquete1.desenhar()
    requestAnimationFrame(loop)
}
loop()
