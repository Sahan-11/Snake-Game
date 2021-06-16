
/********game loop*****/
let lastrenderTime=0;
const speed =10;
const board = document.getElementById('ground');
const snakebody = [{x:10,y:10}];
let inputDirn = {x:0,y:0};
let food = randomGridPosition();
let gameover = false;
let score = 0;
function main(currentTime){
    if(gameover){
        if(confirm('You lost. Click on OK to play again')){
            window.location='/';
        }
        return;
    }
    window.requestAnimationFrame(main)
    if((currentTime-lastrenderTime)<1000/speed){
        return;
    }
    lastrenderTime=currentTime;
    update();
    draw(board);
    //console.log(currentTime)
}
window.requestAnimationFrame(main)
function update(){
   for(let i=snakebody.length-1;i>=1;i--){
       snakebody[i]={...snakebody[i-1]};
       //snakebody[i]=snakebody[i-1] ;
   }
   snakebody[0].x+=inputDirn.x;
   snakebody[0].y+=inputDirn.y;

   if(snakebody[0].x==food.x&&snakebody[0].y==food.y){
       score++;
       scorebox.innerHTML="Score: "+ score;
       snakebody.push(snakebody[snakebody.length-1]);
       let newpos;
       while(newpos==null||snakeonfood(newpos)){
           console.log(newpos);
           newpos=randomGridPosition();
       }
       food=newpos;
   }
   gameover=checkgameover(snakebody[0]);
}
function draw(board){
    board.innerHTML = ''
    snakebody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })
    const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}
window.addEventListener('keydown',function(event){
    switch(event.key){
        case 'ArrowUp': 
            if(inputDirn.y!=0){break;}
            inputDirn.x=0;
            inputDirn.y=-1;
            break;
        case 'ArrowDown': 
        if(inputDirn.y!=0){break;}
            inputDirn.x=0;
            inputDirn.y=1;
            break;
        case 'ArrowRight': 
        if(inputDirn.x!=0){break;}
            inputDirn.x=1;
            inputDirn.y=0;
            break;
        case 'ArrowLeft': 
        if(inputDirn.x!=0){break;}
            inputDirn.x=-1;
            inputDirn.y=0;
            break;
    }
})

function snakeonfood(position){
    //return 0;
     /*snakebody.some(segment => {
        return (segment.x===position.x&&segment.y===position.y);
    })*/
    for(var i=0;i<snakebody.length;i++){
        if(position.x===snakebody[i].x&&position.y===snakebody[i].y){
            return true;
        }
    }
    return 0;
}
function randomGridPosition(){
    return {
        x: Math.floor(Math.random()*20)+1,
        y: Math.floor(Math.random()*20)+1,
    };
}
function checkgameover(position){
    return outsidegame(position)||snakeintersection(position);
}
function snakeintersection(position){
    if(snakebody.length===2){
        return false;
    }
    for(var i=1;i<snakebody.length;i++){
        if(position.x===snakebody[i].x&&position.y===snakebody[i].y){
            return true;
        }
    }
    return false;
}
function outsidegame(position){
    return position.x<1||position.x>20||position.y>20||position.y<1;
}
