const canvas=document.querySelector("canvas");
const c=canvas.getContext('2d');

canvas.width=1024;
canvas.height=578;

c.fillRect(0,0,canvas.width, canvas.height);

const gravity=0.8;

class Sprite{
    constructor({position, velocity, color="red", offset})
    {
        this.position=position;
        this.velocity=velocity;
        this.height=150
        this.width=50
        this.lastKey;
        this.attackBox={
            position: {
                x:this.position.x,
                y:this.position.y
            },
            offset,
            width:100,
            height:50
        }

        this.color=color;
        this.isAttacking;
    }

    draw()
    {
        c.fillStyle=this.color;
        c.fillRect(this.position.x, this.position.y, 50, this.height)

        //health bar
        //if(this.isAttacking)
        {
        c.fillStyle="green";
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }

    }

    update()
    {
        this.draw();
        this.attackBox.position.x=this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y=this.position.y;
        this.position.x+=this.velocity.x;
        
        this.position.y+=this.velocity.y;
        
        if(this.position.y+this.height+this.velocity.y>=canvas.height)
        {
            this.velocity.y=0;
        }
        else
        {
            this.velocity.y+=gravity;
        }
    }

    attack() {
        this.isAttacking=true
        setTimeout[() => {
                this.isAttacking=false
            },100]
        
    
        }
}

const player=new Sprite({
    position:{
    x:0,
    y:0
},

velocity:
{
  x:0,
  y:0
},

offset:
{
    x:0,
    y:0
}
});


const enemy=new Sprite({
    position:{
    x:400,
    y:100
},

velocity:
{
  x:0,
  y:0
},

offset:
{
    x: -50,
    y:0
}
,

color:"blue"


});



const keys=
{
    a:{
        pressed:false
    },
    d:
    {
        pressed:false
    },
    ArrowRight:

    {
        pressed:false
    },
    ArrowLeft:
    {
        pressed:false
    }
}

function animate()
{
    window.requestAnimationFrame(animate);
    c.fillStyle="black";
    c.fillRect(0,0,canvas.width, canvas.height);
    player.update();
    enemy.update();
    player.velocity.x=0;
    enemy.velocity.x=0;
    //player movement:

    if(keys.a.pressed && player.lastKey==='a'){
        player.velocity.x=-5;
    }
    else if(keys.d.pressed && player.lastKey==='d')
    {
        player.velocity.x=5;
    }

    //enemy movement:
    if(keys.ArrowLeft.pressed && enemy.lastKey==='ArrowLeft'){
        enemy.velocity.x=-5;
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey==='ArrowRight')
    {
       enemy.velocity.x=5;
    }
   
    if(player.attackBox.position.x + player.attackBox.width >= enemy.position.x 
        && player.attackBox.position.x <= enemy.position.x + enemy.width
        && player.attackBox.position.y + player.attackBox.height >= enemy.position.y
        && player.attackBox.position.y <= enemy.position.y + enemy.height
        && player.isAttacking){
            player.isAttacking=false;
        console.log('ho');
    }

}

animate();

window.addEventListener("keydown", function(event)
{
    switch(event.key)
    {
        case 'd':
           keys.d.pressed=true
           player.lastKey='d';
        break

        case 'a':
            keys.a.pressed=true;
            player.lastKey='a';
            break

        case 'w':
            player.velocity.y=-17;
            break;


            case 'ArrowRight':
           keys.ArrowRight.pressed=true;
           enemy.lastKey="ArrowRight";
           
        break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true;
            enemy.lastKey='ArrowLeft';
            break

        case 'ArrowUp':
            enemy.velocity.y=-17;
            break;

        case ' ':
            player.attack();
            break;


    }

    console.log(event.key);

});








window.addEventListener("keyup", function(event)
{
    switch(event.key)
    {
        case 'd':
            keys.d.pressed=false
        break

        case 'a':
        keys.a.pressed=false
        break;

       



    }

//enemykeys:
  switch(event.key){
    
    
    case 'ArrowRight':
    keys.ArrowRight.pressed=false;
    
 break

 case 'ArrowLeft':
     keys.ArrowLeft.pressed=false;
     
     break

  }
    
    console.log(event.key);

})