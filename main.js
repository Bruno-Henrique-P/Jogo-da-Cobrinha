const tabu = document.querySelector('.tabuleiro');
const start = document.getElementById('startbtn');
const score = document.getElementById('score');
const result = document.getElementById('result');
const width = 10;
let PosiAtual = 0;
let cobra = [0];
let lastMov;
let interval = 0;
let speed = 0.9;
let intervalTime = 500;
let msg = '';

for(let x = 0 ; x< 100 ; x++){
    const square = document.createElement('div');
    square.setAttribute('id' , x);
    square.classList.add('square');
    tabu.appendChild(square);
}

const squareAll = document.querySelectorAll('.square');
squareAll[PosiAtual].classList.add('black');

function maca(){
    let randomIndex;
    randomIndex = Math.floor(Math.random()*100);
    cobra.forEach(x=> {
        if(x == randomIndex){

        }
    })
    
    tabu.children[randomIndex].classList.add('red')
}


 
function moves(){

    console.log(cobra)
        if(HitTabu(lastMov)){
            msg = 'Voce perdeu';
            message(msg);
            resetGame();
            return;
        }
        lastMov == 'ArrowDown'? PosiAtual = PosiAtual+10: PosiAtual = PosiAtual;
        lastMov == 'ArrowLeft'?PosiAtual =  PosiAtual-1: PosiAtual = PosiAtual;
        lastMov == 'ArrowUp'? PosiAtual =  PosiAtual-10: PosiAtual = PosiAtual;
        lastMov == 'ArrowRight'? PosiAtual =  PosiAtual+1: PosiAtual = PosiAtual;
        
        removeBlack();
       
        if(didHit()){
            msg = 'Voce perdeu';
            message(msg);
            resetGame();
        }
        
        movimento();
        attCobra();  
    }

function ate(){
    if(squareAll[PosiAtual].classList.contains('red')){
        squareAll[PosiAtual].classList.remove('red');
        maca();
        clearInterval(interval);
        intervalTime = intervalTime*speed
        interval = setInterval(moves,intervalTime);
        return true;
    };  
    return false;
}

function movimento(){
    if(ate()){
        cobra.unshift(PosiAtual);
        score.innerHTML ='Score: '+ (cobra.length -2);
    } else {
    cobra.splice(-1,1);
    cobra.unshift(PosiAtual);
    }
}

function attCobra(){
    cobra.forEach(x =>squareAll[x].classList.add('black'));

}

function HitTabu(lastMov){
    if(PosiAtual >= width*width - width && lastMov == 'ArrowDown'){
        return true;
    }
    if(PosiAtual % width == width-1 && lastMov == 'ArrowRight'){
        return true;
    }
    if(PosiAtual % width == 0 && lastMov == 'ArrowLeft'){
        return true;
    }
    if(PosiAtual - width < 0 && lastMov == 'ArrowUp'){
        return true;
    }
    return false
    
}

function removeBlack(){
    cobra.forEach(x =>squareAll[x].classList.remove('black'));
    console.log(cobra[0])
}

function didHit(){
    let bateu = false
    if(cobra.length !=1){
        cobra.forEach(x => x == PosiAtual?bateu = true:bateu = bateu);
    }
    
    return bateu;
}

function resetGame(){
    removeBlack(); 
    message(msg);
    PosiAtual = 0;
    cobra = [0];
    lastMov = '';
    score.innerHTML ='Score: '+ 0;
    msg = '';
    clearInterval(interval);
    intervalTime = 500;
    interval = setInterval(moves,intervalTime);
    attCobra(); 
}

function message(msg){
    result.innerHTML = msg;
}

document.addEventListener('keyup' , (e)=>{
    lastMov = e.key;
    msg = '';
    message(msg);
})
interval = setInterval(moves,intervalTime);
start.addEventListener('click' , resetGame);
maca();
