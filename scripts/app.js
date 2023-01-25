const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'blue');
gradient.addColorStop(0.4, 'pink');
gradient.addColorStop(0.6, 'yellow');
gradient.addColorStop(0.8, 'grey');
gradient.addColorStop(0.9, 'green');
gradient.addColorStop(1, 'red');


class Symbol{
    constructor(x, y, fontSize, canvasHeight){
    this.characters ='abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
    }
    draw(){
        this.text = this.characters.charAt(Math.floor(Math.random()* this.characters.length));
       context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.01){
            this.y = 0;
        }else{
            this.y += 1;
        }

    }
}
class Effect{
    constructor(canvasWidth , canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 20
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
        console.log(this.symbols);
    }
    #initialize(){
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}
const effect = new Effect(canvas.width , canvas.height);
let lastTime = 0;
const fps =10;
const nextFrame = 1000/fps;
let timer = 0;

function animate( timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp ;
    if (timer > nextFrame){
    context.fillStyle = 'rgba(0, 0, 0, 0.10)';
    context.textAlign = 'center';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = gradient; //'#33ccff';
    context.font = effect.fontSize + 'px monospace';
    effect.symbols.forEach(Symbol => Symbol.draw(context));
    timer = 0;
    }else{
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}animate(0);
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
});