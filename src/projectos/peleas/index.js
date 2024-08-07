
   

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
c.fillRect(0,0, canvas.width, canvas.height);
const gravity = 0.7;
const background = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
});

const shop = new Sprite({
    position:{
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale:2.75,
    framesMax:6
});


const player = new Fighter({
position:{
    x:0,
    y:0
},
velocity:{
    x:0,
    y:0
},
offset:{
    x: 0,
    y: 0,
},
imageSrc: './img/samuraiMack/idle.png',
framesMax: 8,
scale:2.5,
offset:{
    x:215,
    y:157
},
sprites:{
    idle:{
        imageSrc: './img/samuraiMack/idle.png',
        framesMax:8,
    },
    run:{
        imageSrc: './img/samuraiMack/Run.png',
        framesMax:8,
    },
    jump:{
        imageSrc: './img/samuraiMack/Jump.png',
        framesMax:2,
    },
    fall:{
        imageSrc: './img/samuraiMack/Fall.png',
        framesMax:2,
    },
    attack1:{
        imageSrc: './img/samuraiMack/Attack1.png',
        framesMax:6,
    },
    takeHit:{
        imageSrc: './img/samuraiMack/take Hit - white silhouette.png',
        framesMax:4,
    },
    death:{
        imageSrc: './img/samuraiMack/Death.png',
        framesMax:6,
    }
},
attackBox:{
    offset:{
        x:100,
        y:50
    },
    width:160,
    height:50
}
})


const enemy = new Fighter({
    position:{
        x:400,
        y:100
    },
    velocity:{
        x:0,
        y:10
    },
    color:'blue',
    offset:{
        x: -50,
        y: 0,
    },
    imageSrc: './img/kenji/idle.png',
    framesMax: 4,
    scale:2.5,
    offset:{
        x:215,
        y:167
    },
    sprites:{
        idle:{
            imageSrc: './img/kenji/idle.png',
            framesMax:4,
        },
        run:{
            imageSrc: './img/kenji/Run.png',
            framesMax:8,
        },
        jump:{
            imageSrc: './img/kenji/Jump.png',
            framesMax:2,
        },
        fall:{
            imageSrc: './img/kenji/Fall.png',
            framesMax:2,
        },
        attack1:{
            imageSrc: './img/kenji/Attack1.png',
            framesMax:4,
        },
        takeHit:{
            imageSrc: './img/kenji/Take hit.png',
            framesMax:3,
        },
        death:{
            imageSrc: './img/kenji/Death.png',
            framesMax:7,
        }
    },
    attackBox:{
        offset:{
            x:-170,
            y:50
        },
        width:170,
        height:50
    }
}
    )



const keys ={
a:{
    pressed:false
},
d:{
    pressed:false
},

w:{
    pressed:false
},

ArrowRight:{
    pressed:false
},

ArrowLeft:{
pressed:false
},
ArrowUp:{
    pressed:false
    }
}


decreaseTimer();

function animate(){
    window.requestAnimationFrame(animate);
c.fillStyle='black';
c.fillRect(0,0, canvas.width, canvas.height);
background.update();
shop.update();
player.update();
enemy.update();



//movimiento del jugador
player.velocity.x = 0;
enemy.velocity.x = 0;
if(keys.a.pressed && player.lastkey === 'a'){
   player.velocity.x = -5; 
   player.switchSprite('run');
}
else if(keys.d.pressed && player.lastkey === 'd'){
    player.velocity.x = 5;
    player.switchSprite('run');
}
else{
    
player.switchSprite('idle');
}
if(player.velocity.y < 0){
    player.switchSprite('Jump');
}
else if(player.velocity.y > 0){
    player.switchSprite('fall');
}

//movimiento del enemigo

enemy.velocity.x = 0;
if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
   enemy.velocity.x = -5; 
   enemy.switchSprite('run');
}
else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
    enemy.velocity.x = 5;
    enemy.switchSprite('run');
}
else{
    enemy.switchSprite('idle');
}
if(enemy.velocity.y < 0){
    enemy.switchSprite('Jump');
}
else if(enemy.velocity.y > 0){
    enemy.switchSprite('fall');
}

//detecion de colision y bajar vida del enemigo
if(rectangularCollision({rectangle1:player, rectangle2:enemy}) && player.isAttacking && player.frameCurrent === 4){

enemy.takeHit();    
player.isAttacking = false;
//enemy.health -= 2;
document.querySelector('#enemyHealt').style.width = enemy.health + '%';
}

//si el jugador falla 
if(player.isAttacking && player.frameCurrent === 4){
player.isAttacking
}


//ataque del enemigo
if(rectangularCollision({rectangle1:enemy, rectangle2:player}) && enemy.isAttacking && enemy.frameCurrent===2)
{
    player.takeHit();
    enemy.isAttacking = false;
    //player.health -= 2;
    //console.log("vida del jugador"+player.health);
    document.querySelector('#playerHealt').style.width = player.health + '%';
    


}
//si el jugador falla 
if(enemy.isAttacking && enemy.frameCurrent === 2){
    enemy.isAttacking
    }
//game over basado en la vida
if(enemy.health <=0 || player.health <=0){
    determineWinner({player, enemy,timerId});
}

}




animate();

window.addEventListener('keydown', (event)=>{
if(!player.dead){


switch(event.key){
case 'd':
keys.d.pressed = true;
player.lastkey = 'd';
break;
case 'a':
keys.a.pressed = true;
player.lastkey = 'a';
break;
case 'w':
keys.a.pressed = true;
player.velocity.y = -20;             
break;
case ' ':
  player.attack();  
break;

}
}

if(!enemy.dead){

switch(event.key){
    case 'ArrowRight':
keys.ArrowRight.pressed = true;
enemy.lastKey = 'ArrowRight';

break;
case 'ArrowLeft':
keys.ArrowLeft.pressed = true;
enemy.lastKey = 'ArrowLeft';
break;
case 'ArrowUp':
keys.ArrowUp.pressed = true;
enemy.velocity.y = -20;             
break;

case 'ArrowDown':
//enemy.isAttacking = true;
enemy.attack();            
break;
}
}
})

window.addEventListener('keyup', (event)=>{

switch(event.key){
case 'd':
keys.d.pressed = false;
break;
case 'a':
keys.a.pressed = false;
break;

case 'w':
keys.w.pressed = false;
break;
       

}


//enemy

switch(event.key){
    case 'ArrowRight':
    keys.ArrowRight.pressed = false;
    break;
    case 'ArrowLeft':
    keys.ArrowLeft.pressed = false;
    break;
    
    case 'ArrowUp':
    keys.ArrowUp.pressed = false;
    break;
           
    
    }


})